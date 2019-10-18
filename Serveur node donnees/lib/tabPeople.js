
let tabPeople = function(tabPeople){

};



let connection = require("../database/connect");





tabPeople.getAllUsers = function getAllUsers(result) {

    console.log("2");
    console.log(connection.con.query('select instauser_id, user from instausers', function (err, res) {


        console.log("3");

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            console.log(res);
            result(null, res);
        }
    }));
};





tabPeople.getAllInfluenceurs= function getAllInfluenceurs(result) {
    connection.con.query('select id_influenceur_profil, pseudo from influenceur_profil', function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            return res[0];
        }
    });
};


module.exports = tabPeople;