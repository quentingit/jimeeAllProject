'use strict';

var User = require('../model/usersModel.js');

exports.getID = function(req, res) {
    console.log("/users controller")
    if(!req.query.token) res.send({error: 'no token'});
    console.log("/users token is : "+req.query.token)
    User.getID(function(err, users) {
        if (err) res.send(err);
        console.log('res', users);
        res.send(users);
    }, req.query.token);
};

