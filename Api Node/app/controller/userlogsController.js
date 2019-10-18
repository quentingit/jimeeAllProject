'use strict';

var UserLogs = require('../model/userlogsModel.js');

exports.list_all_userlogs = function(req, res) {
    if( !req.query.userInstaID ){ res.send({error: 'paramètre userInstaID manquant'}); }

    UserLogs.getAllUserlogs(function(err, userlogs) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', userlogs);
        res.send(userlogs);
    }, req.query.userInstaID);
};

