'use strict';
module.exports = function(app) {
    var tagcomments = require('../controller/tagcommentsController');

//swagger doc : https://mherman.org/blog/swagger-and-nodejs/

    /**
     * @swagger
     * definitions:
     *   TagComments:
     *     properties:
     *       tag:
     *         type: string
     */


    app.route('/tagComments')
    /**
     * @swagger
     * /tagComments:
     *   get:
     *     tags:
     *       - /tagComments
     *     description: Returne tous les tagComments d'un InstaUserID
     *     parameters:
     *       - name: userInstaID
     *         required: true
     *         type: integer
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of TagComments
     *         schema:
     *           $ref: '#/definitions/TagComments'
     */
        .get(tagcomments.list_all_tagComments);

    app.route('/tagComments')
    /**
     * @swagger
     * /tagComments:
     *   post:
     *     tags:
     *       - /tagComments
     *     description: Ajoute un tagComment à un InstaUserID
     *     parameters:
     *       - name: userInstaID
     *         required: true
     *         type: integer
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of TagComments
     *         schema:
     *           $ref: '#/definitions/TagComments'
     */
        .post(tagcomments.add_tagComments);

    app.route('/tagComments')
    /**
     * @swagger
     * /tagComments:
     *   delete:
     *     tags:
     *       - /tagComments
     *     description: Supprime un tagComment d'un InstaUserID
     *     parameters:
     *       - name: userInstaID
     *         required: true
     *         type: integer
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of TagComments
     *         schema:
     *           $ref: '#/definitions/TagComments'
     */
        .delete(tagcomments.delete_tagComments);
};

