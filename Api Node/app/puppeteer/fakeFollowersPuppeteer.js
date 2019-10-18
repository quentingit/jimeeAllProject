
let connection = require("../../database/connect");

let url ='http://pythonflask.eu-west-3.elasticbeanstalk.com/';


const PuppeteerInstagram = require('./lib/index');




function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}






async function fakeFollowersPuppeteer (result, userId) {

  const instagram = new PuppeteerInstagram();
    let dateday = formatDate(new Date());

  try {
    const page = await instagram.signin({ username: 'helloditil', password: 'Jimeetest1!?' });
    const dataFollowers = await instagram.fakeDetect(page);


    console.log(dataFollowers);

    //call python api
    const request = require('request');

    //On envoit l'id de l'user instagram et le tableau de la collecte followers
    request.post(url+'/predictFakeFollowers', {
      json: {
        id: userId,
        dataFollowers: dataFollowers
      }
    }, (error, res, score) => {
      if (error) {
        console.error(error)
        return
      }

        //on recupere le score
        console.log("le score est donc "+ score +"%");


        result({
            score : score+"%"
        });

    });


    //return await instagram.close()
  } catch (err) {
    console.log(err)
  }
}

module.exports = fakeFollowersPuppeteer;














































////////////////////////////////////////////////////////////////////////
/*
       connection.con.query(' INSERT INTO action_fakefollower(date,iduserinsta,score) values ('+ dateday+','+connection.mysql.escape(userID)+ score + ')', function (err, res) {

           if(err) {
               console.log("error: ", err);
               result(null, err);
           }
           else{
               result({
                   score : score+"%"
               });
           }
       });
       */