'use strict';
var connection = require("../../database/connect");

//Task object constructor
var userLogs = function(userlog){

};

userLogs.getAllUserlogs= function getAllUserlogs(result, userInstaID) {
    connection.con.query('select * from logs where instausers_id = '+connection.mysql.escape(userInstaID)+' ORDER BY id DESC LIMIT 10', function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tag comments : ', res);
            result(null, res);
        }
    });
};


module.exports= userLogs;