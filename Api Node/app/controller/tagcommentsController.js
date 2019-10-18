'use strict';

var TagComments = require('../model/tagcommentsModel.js');

exports.list_all_tagComments = function(req, res) {
    if( !req.query.userInstaID ){ res.send({error: 'paramètre userInstaID manquant'}); console.log('param manquant'); }

    TagComments.getAllTagComments(function(err, tagcomment) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', tagcomment);
        res.send(tagcomment);
    }, req.query.userInstaID);
};

exports.add_tagComments = function(req, res) {
    if( !req.body.userInstaID || !req.body.tag ){ res.send({error: 'body manquant'}); console.log('body manquant'); }
    console.log('add_tagComments')
    TagComments.addTagComments(function(err, tagcomment) {

        if (err)
            res.send(err);
        console.log('res', tagcomment);
        res.send(tagcomment);
    }, req.body.userInstaID, req.body.tag);
};

exports.delete_tagComments = function(req, res) {
    if( !req.body.userInstaID || !req.body.tag ){ res.send({error: 'body manquant'}); console.log('body manquant'); }
    console.log('deleteTagComments '+req.body.userInstaID+" "+req.body.tag)
    TagComments.deleteTagComments(function(err, tagcomment) {
        
        if (err)
            res.send(err);
        console.log('res', tagcomment);
        res.send(tagcomment);
    }, req.body.userInstaID, req.body.tag);
};
