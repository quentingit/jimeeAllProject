'use strict';

var instaAccounts = require('../model/instaaccountsModel.js');

exports.list_all_accounts = function(req, res) {
    if( !req.query.userID ) res.send({error: 'paramètre userID manquant'});

    instaAccounts.getAllAccounts(function(err, instaAccounts) {
        if (err) res.send(err);
        console.log('res', instaAccounts);
        res.send(instaAccounts);
    }, req.query.userID);
};

exports.add_account = function(req, res) {
    if( !req.body.instauser | !req.body.userID ) res.send({error: 'body manquant'});

    instaAccounts.addAccount(function(err, instaAccounts) {
        if (err) res.send(err);
        console.log('res', instaAccounts);
        res.send(instaAccounts);
    }, req.body.instauser, req.body.instapass, req.body.userID);
};

exports.delete_account = function(req, res) {
    if( !req.body.userInstaID || !req.body.userID ) res.send({error: 'body manquant'});

    instaAccounts.deleteAccount(function(err, instaAccounts) {
        if (err) res.send(err);
        console.log('res', instaAccounts);
        res.send(instaAccounts);
    }, req.body.userInstaID, req.body.userID);
};
