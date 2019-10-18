const puppeteer = require('puppeteer');
var connection = require("../../database/connect");


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


//pour trier post par popularité
function tri(a,b)
{
    return (a.likes > b.likes)?-1:1;
}





export function  profilGeneral ( id_userinsta, name){

    (async () => {
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();

        await page.goto('https://instagram.com/'+name);

        const element = await page.$eval('._7UhW9', el => el.textContent);

        const text3 = await page.evaluate(() => Array.from(document.querySelectorAll('span.g47SY'), element => element.textContent));
        let nbPosts=parseInt(text3[0].split(' ').join('').split(',').join(''));
        let nbFollowers=parseInt(text3[1].split(' ').join('').split(',').join(''));
        let nbFollowings=parseInt(text3[2].split(' ').join('').split(',').join(''));

        const imgs = await page.$$eval('img.FFVAD[src]', imgs => imgs.map(img => img.getAttribute('src')));

        const elements = await page.$$( '._9AhH0' );
        const data = [];
        for ( let i = 0; i < elements.length; i++ )
        {
            await elements[i].hover();
            data.push(
                //await page.$eval('.Ln-UN', el => el.textContent)
                //await page.evaluate( elements => elements[i].textContent, elements[i] )
                await page.evaluate(() =>
                    Array.from(document.querySelectorAll('.Ln-UN span'),
                        element => element.textContent))
            );
        }

        let nbLikes=0;
        let nbComments=0;


        ///////////////////////////////
        /////POST PHOTOS PROFIL ///////
        ///////////////////////////////
        let url, tmpLikes, tmpComments, tmpRatio;
        let tabPosts = [];
        for(let i=0; i < data.length  ; i++ ){

            //console.log(imgs[i]);
            url=imgs[i];
            tmpLikes=parseInt(data[i][0]);
            tmpComments=parseInt(data[i][2]);
            tmpRatio=  parseFloat((tmpLikes+tmpComments)/nbFollowers*100).toFixed(2)
            nbLikes+=tmpLikes;
            nbComments+=tmpComments;

            tabPosts.push({
                likes :tmpLikes ,
                comments : tmpComments,
                ratio: tmpRatio,
                url: url
            });
        }



        //tri des posts photos par ordre de popularité
        tabPosts.sort(tri);


        let moyLikes=parseInt(nbLikes/12);
        let moyComments=parseInt(nbComments/12);
        let interaction=parseFloat((moyLikes+moyComments)/nbFollowers*100).toFixed(2);


        ////////////////////////////
        //MACHINE LEARNING EQUATION MODEL
        ////////////////////////////

        let ml_like=  0.042926 * nbFollowers  + 0.000080;
        let ml_follower= 1.313055 * nbFollowers + 0.000313 ;

        //////////////////////////////
        //GET DATETIME NOW///////////
        //////////////////////////////
        let dateday = formatDate(new Date());

         ////////////////////////////
         //creation d'un score Global
        /////////////////////////////
         let score=50;
         if(nbFollowers>0 && nbFollowers<5000){
             if(interaction>5 && interaction <10){
                 score+=10
             }else if(interaction>10){
                 score+=20
             }
         }else{
             if(interaction>3 && interaction <7){
                 score+=10
             }else if(interaction>7){
                 score+=20
             }
         }
         if(nbFollowings > 1500){
             score-=10
         }else if(nbFollowings < 500){
                score+=5
         }




        ////////////////////////
        //REQUETE SQL INSERTION//
        /////////////////////////

        connection.con.query(
             "INSERT INTO `statsInfos` ( `id_userinsta`, `n_posts`, `n_followers`, `n_followings`, `log_date`, `like_moyenne` , `commentaire_moyenne`, `pourcentage_interaction`, `score_global`,"+
             " `ml_like`, `ml_follower`, `post1`, `post2`, `post3`, `post4`, `post5`)" +
             " VALUES (" +  id_userinsta +"," + nbPosts +","  + nbFollowers +","  + nbFollowings +",'"  + dateday +"',"  + moyLikes +","  + moyComments +","+ interaction +","+ score +"," +
             ml_like +"," + ml_follower +", '" + tabPosts[0].url +"','" + tabPosts[1].url +"','" + tabPosts[2].url +"','" + tabPosts[3].url +"','" + tabPosts[4].url +"')"

        , function (err, res) {
                if(err) {
                    console.log("error: ", err);

                    result(null, err);
                }

            });



        await browser.close();


    })();


};





































/*
    for(let i=0; i<users.length ; i++){
        let userProfil = users[i];


        ////////////////////////////////////////////////////////
        // 1 - CHECK STATS GLOBALS  UTILISATEURS
        ////////////////////////////////////////////////////////

       // General.profilGeneral();


        ////////////////////////////////////////////////////////
        // 2 - POUR CHAQUE PROFIL - CHECK DES AMELIORATIONS
        ///////////////////////////////////////////////////////
       // Ameliorations.profilAmelioreations();

        ////////////////////////////////////////////////////////
        // 3 - CHECK CONSEILS PERSOS
        ////////////////////////////////////////////////////////

        // 1 : texte dans les publis
        // 2 : cela fais 2 jours que tu n'as pas posté

        //Conseils.profilGeneral();

        ////////////////////////////////////////////////////////
        // 4 - CHECK BADGES
        ////////////////////////////////////////////////////////
       // Badges.profilGeneral();


    }





    //ON CHECK LES INFLUENCEURS POUR L'INSPIRATION
    // 1 : on va sur leur profil, recupere les 12 photos
    // 2 : on prend les 6 meilleures et on met leur url en database
    // 3 : on check si les images n'existent pas  en BDD
    // 3.5 : on ajoute bien categoie | sous-categorie


*/


