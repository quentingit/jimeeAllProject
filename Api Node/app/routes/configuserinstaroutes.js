'use strict';
module.exports = function(app) {
    var configuserinsta = require('../controller/configuserinstaController');

//swagger doc : https://mherman.org/blog/swagger-and-nodejs/



    /**
     * @swagger
     * definitions:
     *      Services:
     *          type: object
     *          properties:
     *              follows:
     *                  type: integer
     *              unfollows:
     *                  type: integer
     *              comments:
     *                  type: integer
     *              likes:
     *                  type: integer
     */


    app.route('/configUserInsta')
        /**
         * @swagger
         * /configUserInsta:
         *   get:
         *     tags:
         *       - /configUserInsta
         *     description: Retourne la configuration du processus python
         *     parameters:
         *       - name: userID
         *         required: true
         *         type: integer
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: An array of Services
         *         schema:
         *           $ref: '#/definitions/Services'
         */
        .get(configuserinsta.get_config)

        /**
         * @swagger
         * /configUserInsta:
         *   post:
         *     tags:
         *       - /configUserInsta
         *     description: Returns all Services
         *     parameters:
         *       - in: body
         *         name: service
         *         description: config propriétés
         *         required: true
         *         schema:
         *            $ref: "#/definitions/Services"
         *     produces:
         *         - "application/json"
         *     responses:
         *          "200":
         *              description: Success
         *              schema:
         *                  $ref: "#/definitions/GeneralResponse"
         *          default:
         *              description: Error
         *              schema:
         *                  $ref: "#/definitions/ErrorResponse"
         */
        .post(configuserinsta.update_config);




};








