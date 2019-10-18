'use strict';
var connection = require("../../database/connect");

//Task object constructor
var instaAccounts = function(instaAccounts){

};

instaAccounts.getAllAccounts = function getAllAccounts(result, userID) {
    connection.con.query('select instauser_id, user, avatar, n_posts, n_followers, n_followings from instausers where users_id = '+connection.mysql.escape(userID), function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};
instaAccounts.addAccount = function addAccount(result, instauser, instapass, userID) {
    connection.con.query('insert into instausers (user, users_id) values ('+connection.mysql.escape(instauser)+',  '+connection.mysql.escape(userID)+')', function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });


    //on doit ajouter stats infos

    //on doit ajouter badges


    //on doit ajourer


};
instaAccounts.deleteAccount = function deleteAccount(result, userInstaID, userID) {
    connection.con.query('delete from instausers where instauser_id = '+connection.mysql.escape(userInstaID)+' and users_id = '+connection.mysql.escape(userID), function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports=instaAccounts;