'use strict';


let actions = require('../model/conseilsModel');

exports.getinfluences = function(req, res) {

    if( !req.query.userID ){ res.send({error: 'paramètre userID manquant'}); }

    actions.getInfluences(function(err, stats) {
        if (err)
            res.send(err);
        res.send(stats);
    }, req.query.userID);

};




exports.getpointAmelioration = function(req, res) {

    if( !req.query.userID ){ res.send({error: 'paramètre userID manquant'}); }

    actions.getpointAmelioration(function(err, stats) {
        if (err)
            res.send(err);
        res.send(stats);
    }, req.query.userID);

};




exports.getconseils = function(req, res) {

    if( !req.query.userID ){ res.send({error: 'paramètre userID manquant'}); }

    actions.getconseils(function(err, stats) {
        if (err)
            res.send(err);
        res.send(stats);
    }, req.query.userID);

};


