'use strict';
module.exports = function(app) {
    var configfollow = require('../controller/configfollowController');

//swagger doc : https://mherman.org/blog/swagger-and-nodejs/

    /**
     * @swagger
     * definitions:
     *   ConfigFollow:
     *     properties:
     *       min_follows:
     *         type: integer
     *       max_follows:
     *         type: integer
     *       min_followers:
     *         type: integer
     *       max_followers:
     *         type: integer
     */


    app.route('/configFollow')
    /**
     * @swagger
     * /configFollow:
     *   get:
     *     tags:
     *       - /configFollow
     *     description: Returne la configuration de la fourchette de following/followers minimium et maximum
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: userInstaID
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: An array of ConfigFollow
     *         schema:
     *           $ref: '#/definitions/ConfigFollow'
     */
        .get(configfollow.list_all_configfollow);

        app.route('/configFollow')
    /**
     * @swagger
     * /configFollow:
     *   post:
     *     tags:
     *       - /configFollow
     *     description: Met à jour la configuration de la fourchette de following/followers minimium et maximum
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of ConfigFollow
     *         schema:
     *           $ref: '#/definitions/ConfigFollow'
     */
        .post(configfollow.update_configfollow);
};

