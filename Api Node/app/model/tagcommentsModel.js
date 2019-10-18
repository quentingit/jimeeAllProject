'use strict';
var connection = require("../../database/connect");

//Task object constructor
var TagComments = function(tagcomments){

};

TagComments.getAllTagComments = function getAllTagComments(result, userInstaID) {
    connection.con.query('select tagcomments, id_userinsta from tagcomments where id_userinsta = '+connection.mysql.escape(userInstaID), function (err, res) {

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

TagComments.addTagComments = function addTagComments(result, userInstaID, tag) {
    connection.con.query('insert into tagcomments (id_userinsta, tagcomments) values ('+connection.mysql.escape(userInstaID)+', '+connection.mysql.escape(tag)+')', function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('post tag comments : ', res);

            result(null, res);
        }
    });
};

TagComments.deleteTagComments = function deleteTagComments(result, userInstaID, tag) {
    connection.con.query('delete from tagcomments where id_userinsta = '+connection.mysql.escape(userInstaID)+' and tagcomments = '+connection.mysql.escape(tag), function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('delete tag comments : ', res);

            result(null, res);
        }
    });
};


module.exports= TagComments;