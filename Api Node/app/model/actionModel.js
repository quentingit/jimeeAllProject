'use strict';
let connection = require("../../database/connect");

//Task object constructor
let action = function(action){

};


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}



//PROMISE SQL
let database = require("../../database/config");
const mysql2 = require('mysql2/promise');
let pool  = mysql2.createPool(database.databasePromise);



action.generateHashtags = function generateHashtags(result, userID, nb) {


    //limit max
    if(nb>30){
        nb=30;
    }

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
        let mysqlPrepareHashtags ="SELECT tag from hashtags"+
            " where categorie=" + "'" + cat.categorie + "'" ;

        if(cat.sous_categorie1){ mysqlPrepareHashtags += " and sous_categorie=" + "'global'" ; }
        if(cat.sous_categorie1){ mysqlPrepareHashtags += " or sous_categorie=" + "'" + cat.sous_categorie1 + "'" ; }
        if(cat.sous_categorie2){mysqlPrepareHashtags += " or sous_categorie=" + "'" + cat.sous_categorie2 +  "'" ;}
        if(cat.sous_categorie3){ mysqlPrepareHashtags += " or sous_categorie=" + "'" + cat.sous_categorie3 + "'" ;}
        if(cat.sous_categorie4){ mysqlPrepareHashtags += " or sous_categorie=" + "'" + cat.sous_categorie4 + "'" ;}
        if(cat.sous_categorie5){mysqlPrepareHashtags += " or sous_categorie=" + "'" + cat.sous_categorie5 + "'" ;}
        if(cat.sous_categorie6){ mysqlPrepareHashtags += " or sous_categorie=" + "'" + cat.sous_categorie6 + "'" ;}

        mysqlPrepareHashtags += "  ORDER BY RAND() limit " +  nb ;


        return connectionPromise.query(mysqlPrepareHashtags);
    }).then(function(hashtags){


        let tabHasshtags = [];
        for(let i=0; i<hashtags[0].length; i++){
            tabHasshtags.push(hashtags[0][i].tag);
        }
        return tabHasshtags;

    }).then(function(resultHashtags){
        //FIN DE LA CONNECTION A LA BDD
        connectionPromise.release();


        console.log(resultHashtags);
        result(null, resultHashtags);

    });





};




action.getboost = function getboost(result, userInstaID) {


    let dateday = formatDate(new Date());
    let mysqlPrepare ="INSERT INTO boost (boost,date_boost, id_userinsta)"+
        "  VALUES ( '1','"+ dateday +"','" + userInstaID + "')";

    let connectionPromise;


    //if  already exists
    pool.getConnection().then(function(conn){
        connectionPromise = conn;
        return connectionPromise.query(mysqlPrepare);
    }).then(function(distinctCategories) {
        connectionPromise.release();
        //on lance l'api python


        let request = require('request');
        request({
            method: 'GET',
            url: 'http://localhost:40100/boost',
        }, function(error, response, body) {
            if (error) console.log(error);
        });




        result(null, "sucess");

    })





};


action.getboostStatus = function getboostStatus(result, userInstaID) {

    let dateday = formatDate(new Date());
    let mysqlPrepare =" SELECT COUNT(*) as nbBoost FROM boost WHERE"+
        " id_userinsta="+userInstaID+" and date_boost='"+dateday+"' and boost>=1";


    connection.con.query(mysqlPrepare, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};











module.exports = action;