/* Nicolas BAPTISTA - V1.0 */
    //export const api = "http://62.210.72.103:8001/"; // URL DE L'API
    export const api = "http://apinode.eu-west-3.elasticbeanstalk.com/"; // URL DE L'API
    let bearerToken = ""; // TOKEN POUR OAUTH2
    let userID = ""; // UserID Connecté actuellement
    let userInstaID = ""; // ID Compte instagram sélectionné de l'utilisateur connecté
    let userInsta = ""; // Compte instagramm sélectionné de l'utilisateur connecté
    var accountSetting, accountSetting2; // Paramètre du compte
    var InstaAccountList; // Liste des comptes Instagram en cache
    var ConfigUserInsta; // Liste des configurations (like,follow,unfollow,comment) en cache
    var actualArticle; // cache dernier article lu

    // SETTER
    
    export function setToken(newValue) {
        bearerToken = newValue;
        console.log("SET bearerToken TO : "+bearerToken);
    }

    export function setUserID(newValue) {
        userID = newValue;
        console.log("SET userID TO : "+userID);
    }

    export function setUserInsta(userID, user) {
        userInstaID = userID;
        userInsta = user;
        console.log("SET userInstaID TO : "+userInstaID+" and userInsta TO : "+userInsta);
    }

    export function clearAll() {
        bearerToken = "";
        userID = "";
        userInsta = "";
        userInstaID = "";
    }

    // LISTE DES COMPTES (CACHE)

    export function setInstaAccountList(json) {
        //console.log(json);
        InstaAccountList = json;
    }

    // LISTE DES CONFIGURATIONS (CACHE)

    export function setConfigUserInsta(json) {
        //console.log(json);
        ConfigUserInsta = json;
    }

    // GETTER

    export function getToken() {
        return bearerToken;
    }

    export function getUserID() {
        return userID;
    }

    export function getUserInstaID() {
        return userInstaID;
    }

    export function getUserInsta() {
        return userInsta;
    }

    // LISTE DES COMPTES (CACHE)

    export function getInstaAccountList() {
        return InstaAccountList;
    }

    export function getInstaAccount(userInstaID) {
/*
  "avatar": "https://scontent-cdt1-1.cdninstagram.com/vp/86329583651a5c17e8cc1c368a8e64d0/5D84D7CB/t51.2885-19/s150x150/50064673_374786013358447_8539822137655951360_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com",
  "instauser_id": 12,
  "n_followers": 16,
  "n_followings": 5,
  "n_posts": 0,
  "user": "kranysys",
*/
        if( InstaAccountList != undefined ){
            //console.log("getInstaAccount "+userInstaID);
            //console.log("count instaccount : "+countInstaAccountList());
            for(var i = 0;i<countInstaAccountList();i++){
            // console.log(i+"/"+countInstaAccountList()+" : "+InstaAccountList[i].instauser_id+" = "+userInstaID+" ?");
                if( InstaAccountList[i].instauser_id == userInstaID )
                {
                    //console.log("OK -- ");
                    //console.log(InstaAccountList[i]);
                return InstaAccountList[i];
                }
            }
        }
    }

    export function countInstaAccountList() {
        var str = JSON.stringify(InstaAccountList);

        if( InstaAccountList != undefined ){
            //console.log("not un 1")
            //console.log(InstaAccountList)
            if( InstaAccountList.lenght != undefined ){
                //console.log("not un 2")
                return InstaAccountList.lenght;
            } else {
                //console.log("undef 2 : "+Object.keys(InstaAccountList).length)
                return Object.keys(InstaAccountList).length;
            }
        } else //console.log("InstaAccountList undef")
        return 0;
    }

    // GETTER LISTE DES CONFIGURATIONS (CACHE)

    export function getConfigUserInsta() {
        return ConfigUserInsta;
    }

    export function setSettings(json) { accountSetting = json; }
    export function setSettings2(json) { accountSetting2 = json; }
    export function getSettings() { return accountSetting; }
    export function getSettings2() { return accountSetting2; }
    export function getArticle() {
        return actualArticle;
    }
    export function setArticle(json) {
        actualArticle = json;
    }