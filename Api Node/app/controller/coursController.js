'use strict';

let cours = require('../model/coursModel.js');

exports.getcours = function(req, res) {


    if( !req.query.idCours){

        cours.getAllCours(function(err, cours) {
            if (err) res.send(err);
            console.log('res', cours);
            res.send(cours);
        });



    }else{

        cours.getCours(function(err, cours) {
            if (err) res.send(err);
            console.log('res', cours);
            res.send(cours);
        }, req.query.idCours);
    }

};





