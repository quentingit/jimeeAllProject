'use strict';

var configUserInsta = require('../model/configuserinstaModel.js');

exports.get_config = function(req, res) {
    if( !req.query.userInstaID ){ res.send({error: 'paramètre userInstaID manquant'}); }

    configUserInsta.getConfig(function(err, configUserInsta) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', configUserInsta);
        res.send(configUserInsta);
    }, req.query.userInstaID);
};




exports.update_config = function(req, res) {
    if( !req.body.userInstaID || !req.body.sommeil || !req.body.likes){ res.send({error: 'paramètre userInstaID manquant'}); }

    console.log(req.body);
    // ON UPDATE DANS LA BASE LA CONFIG
    configUserInsta.updateConfig(function(err, configUserInsta) {
        if (err) res.send(err);
        console.log('res', configUserInsta);
        res.send(configUserInsta);
    }, req.body.userInstaID, req.body.follows, req.body.unfollows, req.body.comments, req.body.likes);
};
