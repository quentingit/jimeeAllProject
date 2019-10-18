'use strict';

var chat = require('../model/chatModel.js');

exports.getLastMessages = function(req, res) {
    if( !req.query.userID ){ res.send({error: 'paramètre userID manquant'}); }

    stats.getLastMessages(function(err, stats) {
        if (err)
            res.send(err);
        res.send(stats);
    }, req.query.userID);
};

