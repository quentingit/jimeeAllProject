'use strict';
module.exports = function(app) {
    let action = require('../controller/coursController');


    app.route('/cours')
        .get(action.getcours);


};






