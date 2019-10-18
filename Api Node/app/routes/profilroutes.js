'use strict';
module.exports = function(app) {
    let profil = require('../controller/profilController');



    app.route('/categories')
        .get(profil.getCategories);

    app.route('/profilCategories')
        .get(profil.getCategoriesProfil);
        //.post(profil.profilCaategories);




};






