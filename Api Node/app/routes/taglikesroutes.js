'use strict';
module.exports = function(app) {
    var taglikes = require('../controller/taglikesController');

//swagger doc : https://mherman.org/blog/swagger-and-nodejs/

    /**
     * @swagger
     * definitions:
     *   TagLikes:
     *     properties:
     *       tag:
     *         type: string
     */


    app.route('/tagLikes')
    /**
     * @swagger
     * /tagLikes:
     *   get:
     *     tags:
     *       - /tagLikes
     *     description: Returne tous les tagLikes d'un InstaUserID
     *     parameters:
     *       - name: userInstaID
     *         required: true
     *         type: integer
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of tagLikes
     *         schema:
     *           $ref: '#/definitions/TagLikes'
     */
        .get(taglikes.list_all_taglikes);

    app.route('/tagLikes')
    /**
     * @swagger
     * /tagLikes:
     *   post:
     *     tags:
     *       - /tagLikes
     *     description: Ajoute un tagLike à un InstaUserID
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of tagLikes
     *         schema:
     *           $ref: '#/definitions/TagLikes'
     */
        .post(taglikes.add_taglikes);

        app.route('/tagLikes')
        /**
         * @swagger
         * /tagLikes:
         *   delete:
         *     tags:
         *       - /tagLikes
         *     description: Supprime un tagLike d'un InstaUserID
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: An array of tagLikes
         *         schema:
         *           $ref: '#/definitions/TagLikes'
         */
            .delete(taglikes.delete_taglikes);
};

