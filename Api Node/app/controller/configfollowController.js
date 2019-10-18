'use strict';

var ConfigFollow = require('../model/configfollowModel.js');

exports.list_all_configfollow = function(req, res) {
    if( !req.query.userInstaID ){ res.send({error: 'paramètre userInstaID manquant'}); }

    ConfigFollow.getAllConfigfollow(function(err, configfollow) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', configfollow);
        res.send(configfollow);
    }, req.query.userInstaID);
};

exports.update_configfollow = function(req, res) {
    if( !req.body.userInstaID || !req.body.min_follows || !req.body.max_follows || !req.body.min_followers || !req.body.max_followers){ 
        res.send({
            error: 'paramètre userInstaID manquant',
            description: 'received '+req.body.userInstaID+','+req.body.min_follows+','+req.body.max_follows+','+req.body.min_followers+','+req.body.max_followers,
    }); 
    } else console.log('received '+req.body.userInstaID+','+req.body.min_follows+','+req.body.max_follows+','+req.body.min_followers+','+req.body.max_followers)
    
    ConfigFollow.updateConfigfollow(function(err, configfollow) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', configfollow);
        res.send(configfollow);
    }, req.body.userInstaID, req.body.min_follows, req.body.max_follows, req.body.min_followers, req.body.max_followers);
};
