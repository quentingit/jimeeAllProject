'use strict';

let fakeFollowersPuppeteer = require('../puppeteer/fakeFollowersPuppeteer.js');

exports.fakeFollowers = function(req, res) {

    if( !req.query.userID ){ res.send({error: 'paramètre userID manquant'}); }

    fakeFollowersPuppeteer(function(err, stats) {
        if (err)
            res.send(err);
        res.send(stats);
    }, req.query.userID);

};




let actions = require('../model/actionModel');

exports.generateHashtags = function(req, res) {

    if( !req.query.userID ){ res.send({error: 'paramètre userID manquant'}); }
    if( !req.query.nb ){ res.send({error: 'paramètre nb Hashtags manquant'}); }

    actions.generateHashtags(function(err, stats) {
        if (err)
            res.send(err);
        res.send(stats);
    }, req.query.userID,req.query.nb);

};





exports.getboost = function(req, res) {


    if( !req.query.userID ){ res.send({error: 'paramètre userID manquant'}); }

    actions.getboost(function(err, stats) {
        if (err)
            res.send(err);
        res.send(stats);
    }, req.query.userID);

};



exports.getboostStatus = function(req, res) {


    //LIEN VERS L'API PYTHON POUR BOOSTER
    if( !req.query.userID ){ res.send({error: 'paramètre userID manquant'}); }

    actions.getboostStatus(function(err, stats) {
        if (err)
            res.send(err);
        res.send(stats);
    }, req.query.userID);

};




var statsPuppeteer = require('../puppeteer/analysePeoplePuppeteer.js');

exports.getanalysepeople = function(req, res) {


    //LIEN VERS L'API PYTHON POUR BOOSTER
    if( !req.query.pseudo ){ res.send({error: 'paramètre userID manquant'}); }


    statsPuppeteer(function(errInsert, statsPeople) {

        if (errInsert)
            res.send(errInsert);

        console.log('People', statsPeople);

    } , req.query.pseudo);



};





