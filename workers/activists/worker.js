// const crypto = require("crypto");
const throng = require("throng");
const Queue = require("bull");
const db = require("./db.js");
const { model } = require("./db.js");

// Connect to a local redis instance locally, and the Heroku-provided URL in production
let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
let workers = process.env.WEB_CONCURRENCY || 1;

// The maximum number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
let maxJobsPerWorker = 1;

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

function start_form_entries() {
  // Connect to the named work queue
  const workQueue = new Queue("form_entries", REDIS_URL);
  const Model = db.model();
  console.log("Form Entries Worker started!");
  workQueue.process(maxJobsPerWorker, async (job) => {
    // const client = await db.getClient();
    // This is an example job that just slowly reports on progress
    // while doing no work. Replace this with your own job logic.
    // let progress = 0;

    // // throw an error 5% o  f the time
    // if (Math.random() < 0.05) {
    //   throw new Error("This job failed!");
    // }

    // while (progress < 100) {
    //   await sleep(50);
    //   progress += 1;
    //   job.progress(progress);
    // }

    // const text = "select * from form_entries where id = $1 ";
    // const values = [job.data.fe];
    // async/await
    try {
      await db.check();

      const preparedFields = {};
      JSON.parse(job.data.fields).forEach((field) => {
        preparedFields[
          field.label
            .toLowerCase()
            .replace(/ /g, "_")
            .replace(/[^\w-]+/g, "")
        ] = field.value !== undefined ? field.value.toLowerCase() : "";
      });
      // var md5sum = crypto.createHash('md5');
      // md5sum.update(''+c.id + m.id + w.id + fe.id);
      // const indexEmail = extractEmail(preparedFields);
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let activistEmail = "";
      let activistName = "";

      for (const [key, value] of Object.entries(preparedFields)) {
        if (re.test(String(value).toLowerCase())) {
          activistEmail = value;
        } else if (key.indexOf("nome") >= 0 && key.indexOf("sobrenome") < 0) {
          activistName = value;
        }
        // console.log(`${key}: ${value}`);
      }

      const [activist, created] = await Model.Activist.findOrCreate({
        where: { email: activistEmail, community_id: job.data.c },
        defaults: {
          name: activistName,
          email: activistEmail,
          community_id: job.data.c,
        },
      });

      const events_data_form_entries = {
        ...preparedFields,
        id: job.data.id,
        w: job.data.w,
        m: job.data.m,
      };

      if (created) {
        await Model.Activist.update(
          {
            events_data_form_entries: JSON.stringify([
              events_data_form_entries,
            ]),
          },
          {
            where: { id: activist.id },
          }
        );
      } else {
        await Model.Activist.update(
          {
            events_data_form_entries: JSON.stringify(
              JSON.parse(activist.events_data_form_entries).push(
                events_data_form_entries
              )
            ),
          },
          {
            where: { id: activist.id },
          }
        );
      }
      return activistEmail;
    } catch (err) {
      console.log(err.stack);
    }
    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.
  });
}

function start_activists() {
  // Connect to the named work queue
  // [
  //   {
  //     "nome": "teste lucas ",
  //     "sobrenome": "pirola",
  //     "seu_melhor_email": "lucaspirola@gmail.com",
  //     "cep_s_nmeros": "04140040",
  //     "que_servio_de_sade_voc_realiza": "outro",
  //     "whatsapp_com_ddd": "11976503489",
  //     "raa": "parda",
  //     "gnero": "masculino",
  //     "eu_declaro_que_sou_um_profissional_de_sade_e_estou_em_exerccio_no_combate__pandemia_do_covid-19_": "sim",
  //     "id": 2010629,
  //     "w": 24762,
  //     "m": 1407
  //   }
  // ]

  const ddd = {
    estadoPorDdd: {
      11: "SP",
      12: "SP",
      13: "SP",
      14: "SP",
      15: "SP",
      16: "SP",
      17: "SP",
      18: "SP",
      19: "SP",
      21: "RJ",
      22: "RJ",
      24: "RJ",
      27: "ES",
      28: "ES",
      31: "MG",
      32: "MG",
      33: "MG",
      34: "MG",
      35: "MG",
      37: "MG",
      38: "MG",
      41: "PR",
      42: "PR",
      43: "PR",
      44: "PR",
      45: "PR",
      46: "PR",
      47: "SC",
      48: "SC",
      49: "SC",
      51: "RS",
      53: "RS",
      54: "RS",
      55: "RS",
      61: "DF",
      62: "GO",
      63: "TO",
      64: "GO",
      65: "MT",
      66: "MT",
      67: "MS",
      68: "AC",
      69: "RO",
      71: "BA",
      73: "BA",
      74: "BA",
      75: "BA",
      77: "BA",
      79: "SE",
      81: "PE",
      82: "AL",
      83: "PB",
      84: "RN",
      85: "CE",
      86: "PI",
      87: "PE",
      88: "CE",
      89: "PI",
      91: "PA",
      92: "AM",
      93: "PA",
      94: "PA",
      95: "RR",
      96: "AP",
      97: "AM",
      98: "MA",
      99: "MA",
    },
  };

  const extractState = (value) => {
    const states = {
      acre: "ac",
      alagoas: "al",
      amapá: "ap",
      pernambuco: "pe",
      amazonas: "am",
      paraíba: "pb",
      bahia: "ba",
      ceará: "ce",
      "distrito federal": "df",
      "espírito santo": "es",
      goiás: "go",
      "mato grosso": "mt",
      "mato grosso do sul": "ms",
      roraima: "rr",
      maranhão: "ma",
      "minas gerais": "mg",
      paraná: "pr",
      piauí: "pi",
      "rio de janeiro": "rj",
      "rio grande do norte": "rn",
      "rio grande do sul": "rs",
      rondônia: "ro",
      "santa catarina": "sc",
      "são paulo": "sp",
      sergipe: "se",
      tocantins: "to",
      pará: "pa",
    };

    for (const [name, uf] of Object.entries(states)) {
      // console.log(`${name}: ${uf}`);
      if (value.indexOf(uf) >= 0 || value.indexOf(name) >= 0) {
        return uf;
      }
    }
  };

  let workQueue = new Queue("activists", REDIS_URL);
  console.log("Activists Worker started!");
  workQueue.process(maxJobsPerWorker, async (job) => {
    try {
      await db.check();
      const Model = db.model();

      // console.log(JSON.parse(job.data.events_data_form_entries));
      const activist = await Model.Activist.findByPk(job.data.id);
      // console.log(activist);

      const events_data_form_entries = JSON.parse(
        job.data.events_data_form_entries
      );
      events_data_form_entries.forEach((element) => {
        for (const [key, value] of Object.entries(element)) {
          // console.log(`${key}: ${value}`);
          if (key.indexOf("sobrenome") >= 0) {
            activist.last_name = value;
          } else if (key.indexOf("nome") >= 0) {
            activist.name = value;
          } else if (key.indexOf("fone") >= 0) {
            activist.phone = value;
          } else if (key.indexOf("whatsapp") >= 0 || key.indexOf("zap") >= 0) {
            activist.whatsapp = value;
          } else if (key.indexOf("estado") >= 0 || key.indexOf("uf") >= 0) {
            activist.state = extractState(value);
          }
        }
      });

      if (job.data.fixCreatedAt) {
        const formEntry = await Model.FormEntry.findByPk(
          events_data_form_entries[0].id
        );
        activist.createdAt = formEntry.createdAt;
        console.log(activist.createdAt, Date.parse(formEntry.createdAt));
        // formEntry.save();
        return await activist.save();
      } else {
        return await activist.save();
      }
    } catch (err) {
      console.log(err.stack);
    }
    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.
  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start: start_form_entries });
throng({ workers, start: start_activists });
