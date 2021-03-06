/* Quentin BERANGER / Nicolas BAPTISTA / V1.2 */
let mySqlConnection;
const bcrypt = require('bcrypt');
module.exports = injectedMySqlConnection => {

  mySqlConnection = injectedMySqlConnection;

  return {

   registerUserInDB: registerUserInDB,
   registerUserInDBByCode: registerUserInDBByCode,
   getUserFromCrentials: getUserFromCrentials,
   doesUserExist: doesUserExist
 }
};

/**
 * attempts to register a user in the DB with the specified details.
 * it provides the results in the specified callback which takes a
 * DataResponseObject as its only parameter
 *
 * @param username
 * @param password
 * @param registrationCallback - takes a DataResponseObject
 */
function registerUserInDB(username, password, mail, registrationCallback){ // ENREGISTEMENT DE L'USER EN BASE

  let hash=bcrypt.hashSync(password, 10);
  const registerUserQuery = `INSERT INTO users (username, user_password, mail ) VALUES ('${username}', '${hash}' , '${mail}')`;
  //const registerUserQuery = `INSERT INTO users (username, user_password) VALUES ('${username}', SHA('${password}'))` // ANCIENNEMENT

  //execution de l'enregistrement
  mySqlConnection.query(registerUserQuery, registrationCallback)
}


function registerUserInDBByCode(username, password, code, mail,   registrationCallback){

    var hash=bcrypt.hashSync(password, 10);

    console.log("--------------------------------------------");
    console.log(hash);
    //create query using the data in the req.body to register the user in the db
    const registerUserQueryByCode = "UPDATE  users set username='"+ username +"', user_password='"+hash + "', mail ='"+ mail + "' where code='"+ code +"'";

    //execute the query to register the user
    mySqlConnection.query(registerUserQueryByCode, registrationCallback)
}

/**
 * Gets the user with the specified username and password.
 * It provides the results in a callback which takes an:
 * an error object which will be set to null if there is no error.
 * and a user object which will be null if there is no user
 *
 * @param username
 * @param password
 * @param callback - takes an error and a user object
 */
function getUserFromCrentials(username, password, callback) {

  //create query using the data in the req.body to register the user in the db
  //const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND user_password = SHA('${password}')` // ANCIENNEMENT
  const getUserQuery = `SELECT * FROM users WHERE username = '${username}' LIMIT 1`

  console.log('getUserFromCrentials query is: ', getUserQuery);

  //execute the query to get the user
  mySqlConnection.query(getUserQuery, (dataResponseObject) => {
      console.log("réponse du login ---------------------------")
      console.log(dataResponseObject.results[0].user_password);
      if( bcrypt.compareSync(password, dataResponseObject.results[0].user_password) ){
        console.log("bon mot de passe!");

        //pass in the error which may be null and pass the results object which we get the user from if it is not null
        callback(false, dataResponseObject.results !== null && dataResponseObject.results.length  === 1 ?  dataResponseObject.results[0] : null) // bon MDP
      } else {
        console.log("mauvais mot de passe!");
        callback(false, null); // mauvais MDP
      }
      console.log(" ---------------------------")
  })
}

/**
 * Determines whether or not user with the specified userName exists.
 * It provides the results in a callback which takes 2 parameters:
 * an error object which will be set to null if there is no error, and
 * secondly a boolean value which says whether or the user exists.
 * The boolean value is set to true if the user exists else it's set
 * to false or it will be null if the results object is null.
 *
 * @param username
 * @param callback - takes an error and a boolean value indicating
 *                   whether a user exists
 */
function doesUserExist(username, callback) {

  //create query to check if the user already exists
  const doesUserExistQuery = `SELECT * FROM users WHERE username = '${username}'`

  //holds the results  from the query
  const sqlCallback = (dataResponseObject) => {

      //calculate if user exists or assign null if results is null
      const doesUserExist = dataResponseObject.results !== null ? dataResponseObject.results.length > 0 ? true : false : null

      //check if there are any users with this username and return the appropriate value
      callback(dataResponseObject.error, doesUserExist)
  }

  //execute the query to check if the user exists
  mySqlConnection.query(doesUserExistQuery, sqlCallback)
}
