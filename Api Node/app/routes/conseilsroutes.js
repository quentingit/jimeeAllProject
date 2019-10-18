'use strict';
module.exports = function(app) {
    let action = require('../controller/conseilsController');


    app.route('/getInfluences')
        .get(action.getinfluences);

    app.route('/getPointAmelioration')
        .get(action.getpointAmelioration);

    app.route('/getConseils')
        .get(action.getconseils);




};






