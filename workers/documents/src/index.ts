import { Command } from 'commander';
import * as db from './db';
import crypto from 'crypto';
import { queue } from './queue';
import { main as mainCerts} from './certs';
import {makeCommad as makeCleanCommad} from './clean';


const communityId = '9';
const program = new Command();
program.version('0.0.1');

const certs = program.command('certs');

certs.action(mainCerts);

const syncs = program.command('syncs');
// syncs
//   .option('-c, --community-id <value>', 'Id da comunidade a ser contextualizada', "8")

syncs
  .command('form')
  .action(async () => {
    // console.log(utility, args, options);
    await db.check();
    const Model = db.model();

    const formEntries = await db.getActions(communityId, 'form', Model.FormEntry, Model)
    console.log(`There are ${(formEntries.count)} form entries`);

    formEntries.rows.forEach((c: any) => {
      c.mobilizations.forEach((m: any) => {
        m.blocks.forEach((b: any) => {
          b.widgets.forEach((w: any) => {
            w.form_entries.forEach((fe: any) => {
              const preparedFields: any = []
              JSON.parse(fe.fields).forEach((field:any) => {
                preparedFields['form_' + field.label.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')] = (field.value !== undefined) ? field.value.toLowerCase() : "";
              });
              var md5sum = crypto.createHash('md5');
              md5sum.update(''+c.id + m.id + w.id + fe.id);
              const job = queue.createJob(({
                id: md5sum.digest('hex'),
                community_id: c.id,
                community_name: c.name,
                mobilization_id: m.id,
                mobilization_name: m.name,
                activist_email: preparedFields.form_email,
                activist_ip: "",
                activist_first_name: "",
                activist_last_name: "",
                activist_fullname: "",
                activist_city: "",
                activist_state: "",
                activist_phone: "",
                widget_id: w.id,
                action_id: fe.id,
                action_type: "form",
                action_data: ''+JSON.stringify(preparedFields),
                action_created: new Date(fe.createdAt),
                donation_value: "",
                donation_recurring: "",
                donation_status: "",
                pressure_targets_count: "",
                ...preparedFields,
              }));

              job.on('succeeded', (result: any) => {
                console.log(`Received result for job ${job.id}:` ,result);
              });

              job.save();
            });
          });
        });
      });
    });
  });
;
syncs
  .command('pressure')
  .action(async() => {
    const Model = db.model();

    const pressures = await db.getActions(communityId, 'pressure', Model.PressureByEmail, Model)
    console.log(`There are ${(pressures.count)} pressures`);

    pressures.rows.forEach((c: any) => {
      c.mobilizations.forEach((m: any) => {
        m.blocks.forEach((b: any) => {
          b.widgets.forEach((w: any) => {
            w.activist_pressures.map((p: any) => {
              // console.log(p);
              const job = queue.createJob(({
                id: "",
                community_id: c.id,
                community_name: c.name,
                mobilization_id: m.id,
                mobilization_name: m.name,
                // activist_email: p.email,
                activist_ip: "",
                activist_first_name: "",
                activist_last_name: "",
                activist_fullname: "",
                activist_city: "",
                activist_state: "",
                activist_phone: "",
                widget_id: w.id,
                action_id: p.id,
                action_type: "pressure",
                action_data: JSON.stringify(p),
                action_created: new Date(p.createdAt),
                donation_value: "",
                donation_recurring: "",
                donation_status: "",
                pressure_targets_count: ""
              }));
              job.save();

              job.on('succeeded', (result: any) => {
                console.log(`Received result for job ${job.id}:` ,result);
              });

            });
          });
        });
      });
    });
  });
;
syncs
  .command('phone-pressure')
  .action(async() => {
    const Model = db.model();
    const pressuresPhone = await db.getActions(communityId, 'pressure-phone', Model.PressureByPhone, Model)
    console.log(`There are ${(pressuresPhone.count)} pressures phone`);
  });
;
syncs
  .command('donation')
  .action(async() => {
    const Model = db.model();
    const donations = await db.getActions(communityId, 'donation', Model.Donation, Model)
    console.log(`There are ${(donations.count)} donations`);

    donations.rows.forEach((c: any) => {
      c.mobilizations.forEach((m: any) => {
        m.blocks.forEach((b: any) => {
          b.widgets.forEach((w: any) => {
            w.donations.map((d: any) => {
              // console.log(p);
              var md5sum = crypto.createHash('md5');
              md5sum.update(''+c.id + m.d + w.id + d.id);
              const job = queue.createJob(({
                id: md5sum.digest('hex'),
                community_id: c.id,
                community_name: c.name,
                mobilization_id: m.id,
                mobilization_name: m.name,
                activist_email: d.email,
                activist_ip: "",
                activist_first_name: "",
                activist_last_name: "",
                activist_fullname: "",
                activist_city: "",
                activist_state: "",
                activist_phone: "",
                widget_id: w.id,
                action_id: d.id,
                action_type: "donation",
                action_data: JSON.stringify(d),
                action_created: new Date(d.createdAt),
                donation_value: d.amount,
                donation_recurring: d.subscription,
                donation_status: d.transactionStatus,
                pressure_targets_count: ""
              }));
              job.save();

              job.on('succeeded', (result: any) => {
                console.log(`Received result for job ${job.id}:` ,result);
              });

            });
          });
        });
      });
    });
  });
;
// Add nested commands using `.addCommand().
// The command could be created separately in another module.
function makeHeatCommand() {
  const heat = new Command('heat');
  heat
    .command('jug')
    .action(() => {
      console.log('heat jug txt');

      // const Model = db.model();
      // const activist = Model.Activist.findAll();
      // activist.forEach((element: any) => {
      //   console.log(element.name)
      // });

    });
  heat
    .command('pot')
    .action(() => {
      console.log('heat pot');
    });
  return heat;
}
program.addCommand(makeHeatCommand());

program.addCommand(makeCleanCommad()); 

program.parse(process.argv);
