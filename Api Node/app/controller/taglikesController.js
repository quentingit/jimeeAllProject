'use strict';

var TagLikes = require('../model/taglikesModel.js');

exports.list_all_taglikes = function(req, res) {
    if( !req.query.userInstaID ){ res.send({error: 'paramètre userInstaID manquant'}); }

    TagLikes.getAllTaglikes(function(err, taglike) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', taglike);
        res.send(taglike);
    }, req.query.userInstaID);
};

exports.add_taglikes = function(req, res) {
    if( !req.body.userInstaID || !req.body.tag ){ res.send({error: 'body manquant'}); }

    TagLikes.addTaglikes(function(err, taglike) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', taglike);
        res.send(taglike);
    }, req.body.userInstaID, req.body.tag);
};

exports.delete_taglikes = function(req, res) {
    if( !req.body.userInstaID || !req.body.tag ){ res.send({error: 'body manquant'}); }

    TagLikes.deleteTaglikes(function(err, taglike) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', taglike);
        res.send(taglike);
    }, req.body.userInstaID, req.body.tag);
};
