'use strict';
var connection = require("../../database/connect");

//Task object constructor
var TagLikes= function(taglike){

};

TagLikes.getAllTaglikes = function getAllTaglikes(result, userInstaID) {
    connection.con.query('select tag, instausers_id from tagslikes where instausers_id = '+connection.mysql.escape(userInstaID), function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tag like : ', res);

            result(null, res);
        }
    });
};

TagLikes.addTaglikes = function addTaglikes(result, userInstaID, tag) {
    connection.con.query('insert into tagslikes (instausers_id, tag) values ('+connection.mysql.escape(userInstaID)+', '+connection.mysql.escape(tag)+')', function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tag like : ', res);

            result(null, res);
        }
    });
};

TagLikes.deleteTaglikes = function deleteTaglikes(result, userInstaID, tag) {
    connection.con.query('delete from tagslikes where instausers_id = '+connection.mysql.escape(userInstaID)+' and tag = '+connection.mysql.escape(tag), function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tag like : ', res);

            result(null, res);
        }
    });
};

module.exports = TagLikes;