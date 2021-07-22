import * as db from './db';
import { Command } from 'commander';

//search the records of the activist 
const search = async(emailClean:string) =>
{ 
  await db.check();
  const Model =  db.model();  
  const activists = await Model.Activist.findOne({
    where: {
      email: emailClean
    }
  });  
  if (activists === null) { 
    return  undefined;
  } 
  else {  
    const formEntries = await Model.FormEntry.findAndCountAll({
      where: {
        activist_id: activists.get('id')   
      },
    });
    
    const donations = await Model.Donation.findAndCountAll({
      where: {
        activist_id: activists.get('id')   
      },
    });
  
    const activistPressures = await Model.ActivistPressures.findAndCountAll({
      where: {
        activist_id: activists.get('id')   
      },
    });
      
    var id,feCount, dCount, apCount; 

    id = activists.get('id');
    feCount = formEntries.count;
    dCount  = donations.count;
    apCount = activistPressures.count;

    return { id, 
             feCount,
             dCount,
             apCount};
  }
    
}; 

//update the records from each table removing the personal information of the activist   
const update = async(activistClean:any) =>  
{ 
  console.log('Anonymize: ', activistClean.id);
    
  await db.check();
  const Model =  db.model();  
  
  //activist 
  const [results, metadata] = await db.sequelize.query(`update activists  set 
    email = 'anonimo' || to_char(now(),'YYYYMMDDHHMISSMS') || '@nossas.org', 
    "name" = 'anonimo', first_name = 'anonimo', last_name = 'anonimo', 
    phone =NULL, document_number =NULL, document_type =NULL
    where id = ` +  activistClean.id); 
        
  console.log("Activist -",metadata); 
  
  if(activistClean.feCount ==0 && activistClean.dCount ==0 ){
    return
  }
  
  const anonymizeEmail = await Model.Activist.findOne({
    
    where: {
      id: activistClean.id
    },
    attributes: ['email']
    
  });  

  

  //form_entries 
  if(activistClean.feCount > 0) {
    
    const fields = `'[{"uid":"field-1589830753320-94","kind":"text","label":"Seu nome"`+ 
    `,"placeholder":"Primeiro nome","required":"true","value":"anonimo"},`+
    `{"uid":"field-1589830769622-52","kind":"email","label":"Seu e-mail",`+
    `"placeholder":"exemplo@email.com","required":"true",`+
    `"value":"`+anonymizeEmail.get('email')+`"},`+
    `{"uid":"field-1589830789267-97","kind":"number","label":"Zap com DDD",`+
    `"placeholder":"Para chamados urgentes","required":"false","value":"xxxxxxxx"},`+
    `{"uid":"field-1589830835994-98","kind":"dropdown","label":"Seu estado",`+
    `"placeholder":"AC,AL,AP,AM,BA,CE,DF,ES,GO,MA,MT,MS,MG,PA,PB,PR,PE,PI,RJ,RN,RS,RO,RR,SC,`+
    `SP,SE,TO","required":"false","value":"RJ"}]'`;
      
    const [resultsF, metadataF] = await db.sequelize.query('update form_entries set fields =' +
    fields + ' where activist_id = ' + activistClean.id);
      
    console.log("Form_entries -", metadataF );   
  }

  //donations
  if(activistClean.dCount > 0) {
    
    const [resultsD, metadataD] = await db.sequelize.query("update donations set" +
    "email = '"+anonymizeEmail.get('email')+"' ,customer =NULL,card_hash= NULL,"+
    " credit_card = NULL, gateway_data = NULL" 
    + " where activist_id = " +  activistClean.id);
    console.log("Donations -", metadataD); 
  }       
       
}

// add nested commands search ans update
export function makeCommad(){

  const clean = new Command('clean');
  clean
    .command('search')
    .action(async() => {

      const [email] =  process.argv.slice(4);
  
      if(email == undefined) {
        console.log("You need to inform the activist's email"); 
        process.exit(0);
      }
      const activist = await search(email);  
      if(activist == undefined){
        console.log('Email '+ email + ' not found!');
      } 
      else {
        console.log("Activist:", activist.id );  
        console.log("Total form_entries:", activist.feCount );  
        console.log("Total donations:", activist.dCount);  
        console.log("Total activist_pressures:", activist.apCount);
      }
      
    });
  clean  
    .command('update')
    .action(async() => {
      
      const [email] =  process.argv.slice(4);
  
      if(email == undefined) {
        console.log("You need to inform the activist's email"); 
        process.exit(0);
      }
      const activist = await search(email);  
      if(activist == undefined){
        console.log('Email '+ email + ' not found!');
      } 
      else {
        console.log("Activist:", activist.id );  
        console.log("Total form_entries:", activist.feCount );  
        console.log("Total donations:", activist.dCount);  
        console.log("Total activist_pressures:", activist.apCount);
        update(activist);
      }
    
    });
  return clean;  
}