'use strict';
module.exports = function(app) {
    var users = require('../controller/userlogsController');

//swagger doc : https://mherman.org/blog/swagger-and-nodejs/

    /**
     * @swagger
     * definitions:
     *   UserLogs:
     *     properties:
     *       id:
     *         type: integer
     *       type:
     *         type: string
     *       user:
     *         type: string
     *       instausers_id:
     *         type: integer
     *       log_date:
     *         type: date
     */


    app.route('/userLogs')
    /**
     * @swagger
     * /userLogs:
     *   get:
     *     tags:
     *       - /userLogs
     *     description: Returne les 10 derniers logs d'un userInstaID
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: userInstaID
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: An array of UserLogs
     *         schema:
     *           $ref: '#/definitions/UserLogs'
     */
        .get(users.list_all_userlogs);
};




