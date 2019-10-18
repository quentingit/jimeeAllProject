'use strict';
let connection = require("../../database/connect");

//Task object constructor
let profil = function(conseils){

};


//PROMISE SQL
let database = require("../../database/config");
const mysql2 = require('mysql2/promise');
let pool  = mysql2.createPool(database.databasePromise);




profil.getCategories = function categories(result) {


    let mysqlPrepare ="select Distinct(categorie) from categorie";

    let categories;
    pool.getConnection().then(function(conn){
        connection = conn;
        return connection.query(mysqlPrepare);
    }).then(function(distinctCategories) {
        categories=distinctCategories;

        let mysqlPrepare ="select * from categorie" ;
        return connection.query(mysqlPrepare);
    }).then(function(sousCategories) {

        console.log(sousCategories);
        //FIN DE LA CONNECTION A LA BDD
        connection.release();

        result(null, {
            categories: categories[0],
            sousCategories: sousCategories[0]
        });

    });
};





profil.getCategoriesProfil = function categories(result, userID) {

    let mysqlPrepare ="SELECT categorie, sous_categorie1,sous_categorie2,sous_categorie3,sous_categorie4,sous_categorie5,sous_categorie6  "+
        " FROM instaconfig" +
        " WHERE id_userinsta =  " + userID ;

    pool.getConnection().then(function(conn){
        connection = conn;
        return connection.query(mysqlPrepare);
    }).then(function(categories) {

        //FIN DE LA CONNECTION A LA BDD
        connection.release();


        let cat = categories[0][0];
        let categorie=cat.categorie;
        let tabCat= [];
        if(cat.sous_categorie1){ tabCat.push(cat.sous_categorie1) }
        if(cat.sous_categorie2){ tabCat.push(cat.sous_categorie2) }
        if(cat.sous_categorie3){ tabCat.push(cat.sous_categorie3) }
        if(cat.sous_categorie4){ tabCat.push(cat.sous_categorie4) }
        if(cat.sous_categorie5){ tabCat.push(cat.sous_categorie5) }
        if(cat.sous_categorie6){ tabCat.push(cat.sous_categorie6) }




        result(null, {
            categorie : categorie,
            sous_categories:tabCat

        });

    })
};










module.exports = profil;