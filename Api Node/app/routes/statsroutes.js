'use strict';
module.exports = function(app) {
    var stats = require('../controller/statsController');

//swagger doc : https://mherman.org/blog/swagger-and-nodejs/

    /**
     * @swagger
     * definitions:
     *   Stats:
     *     properties:
     *       n_posts:
     *         type: integer
     *       n_followers:
     *         type: integer
     *       n_followings:
     *         type: integer
     *       log_date:
     *         type: date
     */


    app.route('/stats')
    /**
     * @swagger
     * /stats:
     *   get:
     *     tags:
     *       - /stats
     *     description: Récupération des statistiques des derniers jours
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: userInstaID
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Stats'
     */
        .get(stats.getLastStats);



    app.route('/statsGraphics')
        .get(stats.getStatsGraphics);



    app.route('/badges')
        .get(stats.getBadges);





};






