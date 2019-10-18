let userDBHelper

const bcrypt = require('bcrypt');
var connection = require("../database/connect");

module.exports = injectedUserDBHelper => {

  userDBHelper = injectedUserDBHelper

  return {
    registerUser: registerUser,
    registerUserByCode: registerUserByCode,
    login: login,
    loginWeb: loginWeb
  }
};

/* handles the api call to register the user and insert them into the users table.
  The req body should contain a username and password. */
function registerUser(req, res){

    console.log(`authRoutesMethods: registerUser: req.body is:`, req.body);

    //query db to see if the user exists already
    userDBHelper.doesUserExist(req.body.username, (sqlError, doesUserExist) => {

      //check if the user exists
      if (sqlError !== null || doesUserExist){

        //message to give summary to client
        const message = sqlError !== null ? "Operation unsuccessful" : "User already exists";

        //detailed error message from callback
        const error =  sqlError !== null ? sqlError : "User already exists";

        sendResponse(res, message, sqlError);

        return
      }

      //register the user in the db
      userDBHelper.registerUserInDB(req.body.username, req.body.password, req.body.mail, dataResponseObject => {

        //create message for the api response
        const message =  dataResponseObject.error === null  ? "Registration was successful" : "Failed to register user"

        sendResponse(res, message, dataResponseObject.error)
      })
    })
  }

 //ON UPDATE UN NOUVEL UTILISATEUR AVEC LE CODE D'INVITATION
function registerUserByCode(req, res){

    console.log("on a ");
    console.log(req.body);
    console.log(`authRoutesMethods: registerUser: req.body is:`, req.body);

    //query db to see if the user exists already
    userDBHelper.doesUserExist(req.body.username, (sqlError, doesUserExist) => {

        //check if the user exists
        if (sqlError !== null || doesUserExist){

            //message to give summary to client
            const message = sqlError !== null ? "Operation unsuccessful" : "User already exists"

            //detailed error message from callback
            const error =  sqlError !== null ? sqlError : "User already exists"

            sendResponse(res, message, sqlError)

            return
        };


        //register the user in the db
        userDBHelper.registerUserInDBByCode(req.body.username, req.body.password,req.body.code, req.body.mail, dataResponseObject => {

            console.log("les message est : ");
            console.log(dataResponseObject);

            //create message for the api response
            const message =  dataResponseObject.error === null  ? "true" : "false";

            //on recuper l'id de l'utilisateur
            if(message){

                const getUserId = "select user_id  from users where username='"+req.body.username +"' and code='"+ req.body.code +"'";

                // execute the UPDATE statement
                connection.con.query(getUserId, (error, results, fields) => {
                    if (error){
                        return console.error(error.message);
                        //si erreur
                        sendResponse("false", message, dataResponseObject.error)
                    }


                    console.log(results[0].user_id);

                    //on renvoit l'id de l'utilisateur
                    res.json([{"id_user":results[0].user_id}]);
                    //sendResponse("true", message, dataResponseObject.error)
                });


            }




            //on renvoit l'id de l'utilisateur
            sendResponse("false", message, dataResponseObject.error)


        });

    })
}



function login(req, res){





}



function loginWeb(req, res){




    let login=req.body.username;
    let pswd=req.body.password;


    let sqlPrepare = "SELECT user_password, user_id FROM users WHERE username='"+login+"'";

    connection.con.query(sqlPrepare, function (err, result, fields) {
        if (err) {
            console.log("ERROR MYSQL LOGIN "+err);
            res.send('{"status": -5}'); }
        else {
            console.log( bcrypt.hashSync(pswd, 10));
            console.log( '---------------------');
            console.log(result[0].user_password);


            if(result[0].user_password){

                if(bcrypt.compareSync(pswd, result[0].user_password)) {
                    res.send('{"status": 1, "id": "'+result[0].user_id+'"}');
                }else{
                    res.send('{"status": -3}');

                }
            }
        }
    });



}

//sends a response created out of the specified parameters to the client.
//The typeOfCall is the purpose of the client's api call
function sendResponse(res, message, error) {

        res
        .status(error !== null ? error !== null ? 400 : 200 : 400)
        .json({
             'message': message,
             'error': error,
        })
}
