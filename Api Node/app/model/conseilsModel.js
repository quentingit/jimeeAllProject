'use strict';
var connection = require("../../database/connect");

//Task object constructor
var conseils = function(conseils){

};


//PROMISE SQL
let database = require("../../database/config");
const mysql2 = require('mysql2/promise');
let pool  = mysql2.createPool(database.databasePromise);


function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}



conseils.getInfluences = function influences(result, userID) {



    let mysqlPrepare ="SELECT categorie, sous_categorie1,sous_categorie2,sous_categorie3,sous_categorie4,sous_categorie5,sous_categorie6  "+
        " FROM instaconfig" +
        " WHERE id_userinsta =  " + userID ;

    let connectionPromise;
    pool.getConnection().then(function(conn){
        //1ERE REQUETE : ON SELECTIONNE TOUS LES ID MEMBRE ATTRIBUES AU PROJET
        connectionPromise = conn;
        return connectionPromise.query(mysqlPrepare);
    }).then(function(categorie){


        let cat = categorie[0][0];

        //2 - on fais une requete qui recupere tous les hashtags
        let mysqlPreparePosts ="SELECT post1, post2, post3, post4 from influenceur_profil"+
            " where categorie=" + "'" + cat.categorie + "'" ;

        if(cat.sous_categorie1){ mysqlPreparePosts += " and sous_categorie=" + "'global'" ; }
        if(cat.sous_categorie1){ mysqlPreparePosts += " or sous_categorie=" + "'" + cat.sous_categorie1 + "'" ; }
        if(cat.sous_categorie2){mysqlPreparePosts += " or sous_categorie=" + "'" + cat.sous_categorie2 +  "'" ;}
        if(cat.sous_categorie3){ mysqlPreparePosts += " or sous_categorie=" + "'" + cat.sous_categorie3 + "'" ;}
        if(cat.sous_categorie4){ mysqlPreparePosts += " or sous_categorie=" + "'" + cat.sous_categorie4 + "'" ;}
        if(cat.sous_categorie5){mysqlPreparePosts += " or sous_categorie=" + "'" + cat.sous_categorie5 + "'" ;}
        if(cat.sous_categorie6){ mysqlPreparePosts += " or sous_categorie=" + "'" + cat.sous_categorie6 + "'" ;}

       // mysqlPreparePosts += "  ORDER BY RAND() limit 20" ;


        console.log(mysqlPreparePosts);

        return connectionPromise.query(mysqlPreparePosts);
    }).then(function(hashtags){


        let tabPosts = [];
        for(let i=0; i<hashtags[0].length; i++){
            tabPosts.push(hashtags[0][i].post1);
            tabPosts.push(hashtags[0][i].post2);
            tabPosts.push(hashtags[0][i].post3);
            tabPosts.push(hashtags[0][i].post4);
        }

        let limit=10;
        return getRandom(tabPosts, limit);

    }).then(function(resultPosts){

        //FIN DE LA CONNECTION A LA BDD
        connectionPromise.release();


        console.log(resultPosts);
        result(null, resultPosts);

    });






};



conseils.getpointAmelioration = function influences(result, userID) {


    //ON CHECK DANS LA BDD SEUL LES ELEMENTS QUI SONT SELECTIONNEES

    connection.con.query('select * from ameliorer_profil where id_userinsta = '+connection.mysql.escape(userID), function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            //on va faire des operations dessus

            let data= res[0];
            let bio_hashtag_valid;
            let bio_profilpic_valid;
            let bio_url_valid;
            let post10_valid;

            if(data.bio_hashtag===1){
                bio_hashtag_valid=1;
            }else{
                bio_hashtag_valid=0;
            }

            if(data.bio_profil===1){
                bio_profilpic_valid=1;
            }else{
                bio_profilpic_valid=0;
            }

            if(data.bio_url===1){
                bio_url_valid=1;
            }else{
                bio_url_valid=0;
            }

            if(data.post10===1){
                post10_valid=1;
            }else{
                post10_valid=0;
            }




            let json = {
                bio_hashtag: {
                        titre: "Hashtag",
                        description : "Mettre un hashtag dans sa biographie",
                        valide :bio_hashtag_valid
                },
                bio_profilpic: {
                    titre: "Image",
                    description : "Mettre une image de profil pour vous reconnaitre",
                    valide :bio_profilpic_valid
                },
                bio_url: {
                    titre: "URL",
                    description : "Ajouter une URL pour partagez quelquechose ",
                    valide :bio_url_valid
                },
                post10: {
                    titre: "Post",
                    description : "Avoir 10 posts sur son profil pour bien débuter",
                    valide :post10_valid
                }

            };


            console.log(json);

            result(null, json);
        }
    });




};







conseils.getconseils = function influences(result, userID) {



    //ON CHECK DANS LA BDD LES DERNIERES NOTIFS

    connection.con.query('select * from conseils where id_userinsta = '+connection.mysql.escape(userID)+' ORDER BY id_conseils DESC LIMIT 20', function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('chat : ', res);
            result(null, res);
        }
    });

};












module.exports = conseils;