'use strict';
var connection = require("../../database/connect");

//Task object constructor
var configUserInsta = function(service){
    /*this.follows = service.follows;
    this.unfollows = service.unfollows;
    this.comments = service.comments;
    this.likes = service.likes;*/

};

/* A CHANGER - ON NE DOIS PAS AVOIR UN SEUL UTILISATEUR ICI */
configUserInsta.getConfig = function getConfig(result, userInstaID) {
    connection.con.query('select likes, sommeil from instaconfig WHERE id_userinsta = '+connection.mysql.escape(userInstaID), function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('GET /configUserInsta : ', res);
            result(null, res);
        }
    });
};

configUserInsta.updateConfig = function updateConfig(result, userInstaID, likes, sommeil){
    connection.con.query('update instaconfig set likes = '+connection.mysql.escape(likes)+', sommeil = '+connection.mysql.escape(sommeil) +' WHERE id_userinsta = '+connection.mysql.escape(userInstaID), function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log("Paramètres mis à jour pour l'userInstaID "+userInstaID+".");
            
            let request = require('request');
            request({
              method: 'GET',
              url: 'http://localhost:40100/process?id='+userInstaID
            }, function(error, response, body) {
              if (error) console.log(error);
              console.log("==GET PROCESS BODY:"+body+"==");
              result(null,"{\"status\": \"done\",\"body\": \""+body+"\"}")
            });
        }
    });
};

module.exports = configUserInsta;

