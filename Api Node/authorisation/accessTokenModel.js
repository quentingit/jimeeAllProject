let userDBHelper
let accessTokensDBHelper

module.exports =  (injectedUserDBHelper, injectedAccessTokensDBHelper) => {

  userDBHelper = injectedUserDBHelper

  accessTokensDBHelper = injectedAccessTokensDBHelper

  return  {

    getClient: getClient,

    saveAccessToken: saveAccessToken,

    getUser: getUser,

    grantTypeAllowed: grantTypeAllowed,

    getAccessToken: getAccessToken
    }
}

function getClient(clientID, clientSecret, callback){

  const client = {
    clientID,
    clientSecret,
    grants: null,
    redirectUris: null
  }

  callback(false, client);
}

function grantTypeAllowed(clientID, grantType, callback) {

  console.log('grantTypeAllowed called and clientID is: ', clientID, ' and grantType is: ', grantType);

  callback(false, true);
}

// RECUPERE L'USER
function getUser(username, password, callback){

  console.log('getUser() called and username is: ', username, ' and password is: ', password, ' and callback is: ', callback, ' and is userDBHelper null is: ', userDBHelper);

  userDBHelper.getUserFromCrentials(username, password, callback)
}

/* SAUVEGARDE L'ACCESSTOKEN AVEC USER_ID */
function saveAccessToken(accessToken, clientID, expires, user, callback){

  console.log('saveAccessToken() called and accessToken is: ', accessToken,
  ' and clientID is: ',clientID, ' and user is: ', user, ' and accessTokensDBhelper is: ', accessTokensDBHelper)

    accessTokensDBHelper.saveAccessToken(accessToken, user.user_id, callback)
}

function getAccessToken(bearerToken, callback) {

  //ESSAI ET RECUPERE L'USERID AVEC LE TOKEN
  accessTokensDBHelper.getUserIDFromBearerToken(bearerToken, (userID) => {

    //CREE LE TOKEN AVEC L'ID RETROUVE
    const accessToken = {
      user: {
        id: userID,
      },
      expires: null
    }

    //ERREUR
    callback(userID == null ? true : false, userID == null ? null : accessToken)
  })
}
