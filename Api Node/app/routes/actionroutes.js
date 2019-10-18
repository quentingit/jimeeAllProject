'use strict';
module.exports = function(app) {
    let action = require('../controller/actionController');


    app.route('/fakeFollowers')
        .get(action.fakeFollowers);


    app.route('/generateHashtags')
        .get(action.generateHashtags);


    app.route('/getBoost')
        .get(action.getboost);

    app.route('/getBoostStatus')
        .get(action.getboostStatus);



    app.route('/getAnalysePeople')
        .get(action.getanalysepeople);


};






