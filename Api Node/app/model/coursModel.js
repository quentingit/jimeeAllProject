'use strict';
var connection = require("../../database/connect");

//Task object constructor
var cours = function(cours){

};



//PROMISE SQL
let database = require("../../database/config");
const mysql2 = require('mysql2/promise');
let pool  = mysql2.createPool(database.databasePromise);






cours.getAllCours = function influences(result) {



    let mysqlPrepare ="select distinct (categorie)  from cours ";

    let categories;


    let connectionPromise;
    pool.getConnection().then(function(conn){
        connectionPromise = conn;
        return connectionPromise.query(mysqlPrepare);
    }).then(function(distinctCategories) {
        categories=distinctCategories;
        let mysqlPrepare ="select id_cours, titre, description, image, categorie  from cours order by date_ajout desc";
        return connectionPromise.query(mysqlPrepare);
    }).then(function(articles) {


        //FIN DE LA CONNECTION A LA BDD
        connectionPromise.release();



        result(null, {
            categories: categories[0],
            cours: articles[0]
        });

    });


};




cours.getCours = function influences(result, id) {
    connection.con.query('select * from cours where id_cours='+id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
















module.exports = cours;