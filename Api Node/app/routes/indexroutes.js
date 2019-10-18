'use strict';
module.exports = function(app) {
    var index = require('../controller/indexController');

//swagger doc : https://mherman.org/blog/swagger-and-nodejs/

    app.route('/')
    /**
     * @swagger
     * /:
     *   get:
     *     tags:
     *       - Index
     *     description: Retourne la version actuelle, sert à tester que le serveur est fonctionnel
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Retourne la version
     */
        .get(index.getindex);
};


