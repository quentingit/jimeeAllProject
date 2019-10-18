'use strict';
module.exports = function(app) {
    var instaAccounts = require('../controller/instaaccountsController');

//swagger doc : https://mherman.org/blog/swagger-and-nodejs/

    /**
     * @swagger
     * definitions:
     *   instaAccounts:
     *     properties:
     *       instauser_id:
     *         type: integer
     *       user:
     *         type: string
     *       avatar:
     *         type: string
     *       n_posts:
     *         type: integer
     *       n_followers:
     *         type: integer
     *       n_followings:
     *         type: integer
     */


    app.route('/instaAccounts')
    /**
     * @swagger
     * /instaAccounts:
     *   get:
     *     tags:
     *       - /instaAccounts
     *     description: Returne la listes des comptes Instagram d'un utilisateur
     *     parameters:
     *       - name: userID
     *         required: true
     *         type: integer
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/instaAccounts'
     */
        .get(instaAccounts.list_all_accounts);

    app.route('/instaAccounts')
    /**
     * @swagger
     * /instaAccounts:
     *   post:
     *     tags:
     *       - /instaAccounts
     *     description: Ajoute un compte Instagram
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/instaAccounts'
     */
        .post(instaAccounts.add_account);
        
    app.route('/instaAccounts')
    /**
     * @swagger
     * /instaAccounts:
     *   delete:
     *     tags:
     *       - /instaAccounts
     *     description: Supprime un compte Instagram
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/instaAccounts'
     */
        .delete(instaAccounts.delete_account);


        //app.route('/addPasswordInstagramAccount')

};






