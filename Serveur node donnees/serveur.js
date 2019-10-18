const General = require('./lib/profilGeneral');
//const Ameliorations = require('./lib/profilAmelioreations');
//const Conseils = require('./lib/profilAmelioreations');
//const Badges = require('./lib/profilAmelioreations');
//const Influenceurs = require('./lib/profilAmelioreations');

const tabPeople = require('./lib/tabPeople');

///////////////
//PROMISE SQL
let database = require("./database/config");
const mysql2 = require('mysql2/promise');
let pool  = mysql2.createPool(database.databasePromise);

/////////////






/////////////////////////////////////////////
/////////BOUCLE INFINI SERVEUR///////////////
/////////////////////////////////////////////


function timeoutFunc() {
    loop();
    setTimeout(timeoutFunc, 1000*60*60*10);
}
timeoutFunc();

///////////////////////////////
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};








////////////////////////////////////////////////////////
// CHECK DES UTILISATEURS ET DES INFLUENCEURS
////////////////////////////////////////////////////////






function loop(){


        let mysqlPrepareUserInsta ="SELECT instauser_id, user FROM instausers";
        let mysqlPrepareInfluenceur ="SELECT id_influenceur_profil, pseudo FROM influenceur_profil";


        pool.getConnection().then(function(conn){
            connection = conn;
            return connection.query(mysqlPrepareUserInsta);
        }).then(async function(users) {


            let usersProfil = users[0];

           // for(let i=0; i<usersProfil.length; i++){
            for(let i=0; i<1; i++){

                 await sleep(10000).then(() => {

                    console.log(usersProfil[i]);
                    ////////////////////////////////////////////////////////
                    // 1 - CHECK STATS GLOBALS  UTILISATEURS
                    ////////////////////////////////////////////////////////

                    let id = usersProfil[i].instauser_id;
                    let pseudo = usersProfil[i].user;



                    General.profilGeneral(id, pseudo);
                })

            }


            var promiseArray= [];
            users[0].forEach(function(entry) {
                let id_membre = entry.id_membre;
                var sqlPrepare = 'select attribution_ha.*, horaire_ha.horaire_debut, horaire_ha.horaire_pause, horaire_ha.horaire_fin   from attribution_ha, horaire_ha where  attribution_ha.id_horaire_ha=horaire_ha.id and attribution_ha.id_membre=' + id_membre + ' and attribution_ha.id_jour>0 and attribution_ha.id_projet=' + projet;

                let id = usersProfil[i].instauser_id;
                let pseudo = usersProfil[i].user;


                General.profilGeneral(id, pseudo);

                promiseArray.push(
                    General.profilGeneral(id, pseudo)
                );
            });

            try {
                return await Promise.all(promiseArray);
            } catch(err) {

                return console.log(err)
            }

        }).then(function(){

            ////////////////////////////////////////////////////////
            // 5 - CHECK INFLUENCEUR
            ////////////////////////////////////////////////////////

            return connection.query(mysqlPrepareInfluenceur);
        }).then(async function(influenceurs){

            let influenceursProfil = influenceurs[0];

            for(let i=0; i<influenceursProfil.length; i++){
                //for(let i=0; i<3; i++){

                await sleep(10000).then(() => {

                    General.profilGeneral(id, pseudo);
                })

            }


        });




















}









