'use strict';
var connection = require("../../database/connect");

//Task object constructor
var chat = function(chat){

};

chat.getLastMessages = function getLastMessages(result, userID) {
    connection.con.query('select * from tchat where id_user = '+connection.mysql.escape(userID)+' ORDER BY id_tchat DESC LIMIT 40', function (err, res) {
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


module.exports = chat;