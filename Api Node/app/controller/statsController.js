'use strict';


//PROMISE SQL
let database = require("../../database/config");
const mysql2 = require('mysql2/promise');
let pool  = mysql2.createPool(database.databasePromise);




let stats = require('../model/statsModel.js');


let statsPuppeteer = require('../puppeteer/statsPuppeteer.js');


exports.getLastStats = function(req, res) {


    let id_userinsta= req.query.userID;


    if( !id_userinsta ){ res.send({error: 'paramètre userID manquant'}); }

    stats.getLastStats(function(err, getStats) {


        console.log('controller');
        if (err)
            res.send(err);


        //SI L'UTILISATEUR EST NOUVEAU
        if(getStats==="toUpdate"){




            let mysqlPrepare ="select user from instausers where instauser_id ="+ id_userinsta;
            let connection;
            pool.getConnection().then(function(conn){

                connection = conn;
                return connection.query(mysqlPrepare);
            }).then(function(pseudo) {


                statsPuppeteer(function(errInsert, statsInsert) {






                    if (errInsert)
                        res.send(errInsert);

                    console.log('INSERT', statsInsert);

                } , id_userinsta, pseudo[0][0].user);


                //return connection.query(mysqlPrepare);
            });


        }else{



            //ON PARSE LES DONNEES POUR QU'ELLE SOIT IDENTIQUE ENTRE LA CREATION D'UN NOUVEL UTILISATEUR ET LA SELECTION


            //////////////////////////////////
            //RESULTAT ENVOYE EN RETOUR///////
            //////////////////////////////////
            res.send({
                nbPosts : getStats[0].n_posts,
                nbFollowers : getStats[0].n_followers,
                nbFollowings : getStats[0].n_followings,
                moyLikes: getStats[0].like_moyenne,
                moyComments : getStats[0].commentaire_moyenne,
                interaction : getStats[0].pourcentage_interaction,
                score : getStats[0].score_global,
                ml_like : getStats[0].ml_like,
                ml_follower : getStats[0].ml_follower,
                posts : {
                    post1: {
                        url: getStats[0].post1,
                        like: getStats[0].postlike1,
                    },
                    post2: {
                        url: getStats[0].post2,
                        like: getStats[0].postlike2,
                    },
                    post3: {
                        url: getStats[0].post3,
                        like: getStats[0].postlike3,
                    },
                    post4: {
                        url: getStats[0].post4,
                        like: getStats[0].postlike4,
                    },
                    post5: {
                        url: getStats[0].post5,
                        like: getStats[0].postlike5,
                    },

                }
            });
        }
    }, id_userinsta);
};




exports.getStatsGraphics = function(req, res) {
    if( !req.query.userID ){ res.send({error: 'paramètre userID manquant'}); console.log('param manquant'); }

    stats.getStatsGraphics(function(err, statsGraphics) {
        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', statsGraphics);
        res.send(statsGraphics);
    }, req.query.userID);
};





exports.getBadges = function(req, res) {
    if( !req.query.userID ){ res.send({error: 'paramètre userID manquant'}); console.log('param manquant'); }

    stats.getBadges(function(err, badges) {
        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', badges);
        res.send(badges);
    }, req.query.userID);
};

