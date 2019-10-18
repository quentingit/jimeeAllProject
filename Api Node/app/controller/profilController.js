'use strict';


let profil = require('../model/profilModel');

exports.getCategories = function(req, res) {



    profil.getCategories(function(err, categories) {
        if (err)
            res.send(err);
        res.send(categories);
    });



};




exports.getCategoriesProfil = function(req, res) {


    let id_userinsta= req.query.userID;
    if( !id_userinsta ){ res.send({error: 'paramètre userID manquant'}); }

    profil.getCategoriesProfil(function(err, categories) {
        if (err)
            res.send(err);
        res.send(categories);
    },id_userinsta );



};


