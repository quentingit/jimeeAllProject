'use strict';
var connection = require("../../database/connect");

//Task object constructor
var ConfigFollow = function(configfollow){

};

ConfigFollow.getAllConfigfollow = function getAllConfigfollow(result, userInstaID) {
    connection.con.query('select min_follows, max_follows, min_followers, max_followers from instaconfig WHERE id_userinsta = '+connection.mysql.escape(userInstaID), function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('GET updateConfigfollow : ', res);

            result(null, res);
        }
    });
};

ConfigFollow.updateConfigfollow = function updateConfigfollow(result, userInstaID, min_follows, max_follows, min_followers, max_followers) {
    connection.con.query('update instaconfig set min_follows = '+connection.mysql.escape(min_follows)+', max_follows = '+connection.mysql.escape(max_follows)+', min_followers = '+connection.mysql.escape(min_followers)+', max_followers = '+connection.mysql.escape(max_followers)+' WHERE id_userinsta = '+connection.mysql.escape(userInstaID), function (err, res) {
        console.log('QUERY: update instaconfig set min_follows = '+connection.mysql.escape(min_follows)+', max_follows = '+connection.mysql.escape(max_follows)+', min_followers = '+connection.mysql.escape(min_followers)+', max_followers = '+connection.mysql.escape(max_followers)+' WHERE id_userinsta = '+connection.mysql.escape(userInstaID))
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('POST updateConfigfollow : ', res);

            result(null, res);
        }
    });
};

module.exports = ConfigFollow;