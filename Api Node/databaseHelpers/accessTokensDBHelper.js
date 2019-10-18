let mySqlConnection

module.exports = injectedMySqlConnection => {

  mySqlConnection = injectedMySqlConnection

  return {
   saveAccessToken: saveAccessToken,
   getUserIDFromBearerToken: getUserIDFromBearerToken
 }
}

/**
 * 
 *
 * @param accessToken
 * @param userID
 * @param callback - EN CAS D'ERREUR APPEL LE CALLBACK
 */
function saveAccessToken(accessToken, userID, callback) {

  const getUserQuery =  `INSERT INTO access_tokens (access_token, user_id) VALUES ("${accessToken}", ${userID}) ON DUPLICATE KEY UPDATE access_token = "${accessToken}";`

  // RECUPERRATION DE L'USER
  mySqlConnection.query(getUserQuery, (dataResponseObject) => {

      //ERREUR
      callback(dataResponseObject.error)
  })
}

/**
 * RECUPERRATION DE L'USER AVEC LE TOKEN
 *
 * @param bearerToken
 * @param callback - EN CAS D'ERREUR
 */
function getUserIDFromBearerToken(bearerToken, callback){

  //create query to get the userID from the row which has the bearerToken
  const getUserIDQuery = `SELECT * FROM access_tokens WHERE access_token = '${bearerToken}';`

  //execute the query to get the userID
  mySqlConnection.query(getUserIDQuery, (dataResponseObject) => {

      //get the userID from the results if its available else assign null
      const userID = dataResponseObject.results != null && dataResponseObject.results.length == 1 ?
                                                              dataResponseObject.results[0].user_id : null

      callback(userID)
  })
}
