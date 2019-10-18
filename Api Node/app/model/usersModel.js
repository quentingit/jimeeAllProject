'use strict';
var connection = require("../../database/connect");

// Recupère l'id de l'utilisateur par le token
var Users = function(user){

};

Users.getID = function getID(result, token) {
    connection.con.query("select user_id, access_tokens_id from access_tokens where access_token = "+connection.mysql.escape(token), function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            // SUPPRESSION DES TOKENS USAGES
            connection.con.query("delete from access_tokens where access_tokens_id < "+connection.mysql.escape(res[0].access_tokens_id)+" and user_id = "+connection.mysql.escape(res[0].user_id), function (err, res) {        
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
            });
            console.log("Résultat /users:")
            console.log(res)
            // RECUPERATION RESULTAT 1RE REQUETE UNIQUEMENT
            result(null, res);
        }
    });
};


module.exports = Users;