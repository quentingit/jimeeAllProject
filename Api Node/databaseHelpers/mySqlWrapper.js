module.exports = {

  query: query
}

const mySql = require('mysql')
var connection = require("../database/connect");

/**
 *
 * @param queryString
 * @param callback
 */
function query(queryString, callback){

  //connection.con.connect()

  connection.con.query(queryString, function(error, results, fields){

    console.log('mySql: query: '+queryString+' error is: ', error, ' and results are: ', results);

    //connection.end();

    callback(createDataResponseObject(error, results))
  })
}

/**
 *
 * @param error
 * @param results
 * @return {DataResponseObject<{error, results}>}
 */
function createDataResponseObject(error, results) {
    console.log("CDO :");console.log(results);
    return {
      error: error,
      results: results === undefined ? null : results === null ? null : results
     }
  }
