'use strict';
module.exports = function(app) {
    var users = require('../controller/usersController');

//swagger doc : https://mherman.org/blog/swagger-and-nodejs/

    /**
     * @swagger
     * definitions:
     *   Users:
     *     properties:
     *       user_id:
     *         type: integer
     *       access_tokens_id:
     *         type: integer
     */


    app.route('/users')
    /**
     * @swagger
     * /users:
     *   get:
     *     tags:
     *       - /users
     *     description: Récupération de l'ID de l'utilisateur avec le token
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: token
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Users'
     */
        .get(users.getID);
};






