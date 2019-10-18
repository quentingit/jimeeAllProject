'use strict';
let connection = require("../../database/connect");

//Task object constructor
let stats = function(stats){

};

stats.getLastStats = function getLastStats(result, userInstaID) {
    connection.con.query('select * from statsInfos where id_userinsta = '+connection.mysql.escape(userInstaID)+' ORDER BY id_statsinfos DESC LIMIT 1', function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            //ON CHECK QU'UNE LIGNE EST DEJA PRESENTE , AUQUEL CAS C'EST UN NOUVEL UTILISATEUR
            if(res.length>0){
                result(null, res);
            }else{
                result(null, "toUpdate");
            }
        }
    });
};





stats.getPseudo = function getPseudo(result, userInstaID) {

    connection.con.query('select user from instausers where instauser_id = '+connection.mysql.escape(userInstaID), function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log(res);
            result(null, res);
        }
    });
};



stats.getStatsGraphics = function getLastStats(result, userInstaID) {
    connection.con.query('select * from statsInfos  where id_userinsta = '+connection.mysql.escape(userInstaID)+' ORDER BY id_statsinfos DESC LIMIT 40', function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
                result(null, res);
        }
    });
};









stats.getBadges = function getBadge(result, userID){


    connection.con.query('select * from badges where id_userinsta  = '+connection.mysql.escape(userID), function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            let badgeImg=[];
            let url;
            res=res[0];
            if(res.followers_100===1){
                url="https://parisianlayers.fr/jimee/badges/f100.jpg";
                badgeImg.push(url);
            }
            if(res.followers_500===1){
                url="https://parisianlayers.fr/jimee/badges/f500.jpg";
                badgeImg.push(url);
            }
            if(res.followers_1000===1){
                url="https://parisianlayers.fr/jimee/badges/f1000.jpg";
                badgeImg.push(url);
            }
            if(res.followers_5000===1){
                url="https://parisianlayers.fr/jimee/badges/f5000.jpg";
                badgeImg.push(url);
            }
            if(res.followers_10000===1){
                url="https://parisianlayers.fr/jimee/badges/f10k.jpg";
                badgeImg.push(url);
            }

            if(res.post_10===1){
                url="https://parisianlayers.fr/jimee/badges/p10.jpg";
                badgeImg.push(url);
            }
            if(res.post_50===1){
                url="https://parisianlayers.fr/jimee/badges/p50.jpg";
                badgeImg.push(url);
            }
            if(res.post_100===1){
                url="https://parisianlayers.fr/jimee/badges/p50.jpg";
                badgeImg.push(url);
            }
            if(res.post_200===1){
                url="https://parisianlayers.fr/jimee/badges/p200.jpg";
                badgeImg.push(url);
            }
            if(res.post_500===1){
                url="https://parisianlayers.fr/jimee/badges/p500.jpg";
                badgeImg.push(url);
            }


            result(null, badgeImg);
        }
    });


};





module.exports = stats;