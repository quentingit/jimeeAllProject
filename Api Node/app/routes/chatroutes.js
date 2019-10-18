'use strict';
module.exports = function(app) {
    var chat = require('../controller/chatController');

//swagger doc : https://mherman.org/blog/swagger-and-nodejs/

    /**
     * @swagger
     * definitions:
     *   Chat:
     *     properties:
     *       message:
     *         type: string
     *       message_date:
     *         type: date
     */


    app.route('/chat')
    /**
     * @swagger
     * /chat:
     *   get:
     *     tags:
     *       - /chat
     *     description: Affichage de la conversation d'un userID
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: userID
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Chat'
     */
        .get(chat.getLastMessages);
};






