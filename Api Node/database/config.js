// Configuration de la connexion
const database = {
    host: "jimee-rds.c5rvo7olhtdv.eu-west-3.rds.amazonaws.com",
    user: "jimee",
    password: "flywithm3",
    database: "test"
};

// CHOIX DE LA BDD//////////
//POUR LE TEST : test
//POUR LA PROD : production




const databasePromise = {
    connectionLimit : 10,
    host: "jimee-rds.c5rvo7olhtdv.eu-west-3.rds.amazonaws.com",
    user: "jimee",
    password: "flywithm3",
    database: "test",
    waitForConnections: true,
    queueLimit: 0
};


module.exports = { database, databasePromise };

