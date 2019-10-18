const Sequelize = require('sequelize')
const config = require('./config')

// Option 1: Passing parameters separately
const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
  host: config.database.host,
  dialect: 'mariadb',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

/*sequelize
  .authenticate()
  .then(() => {
    console.log('SEQ : Connection has been established successfully.');
  })
  .catch(err => {
    console.error('SEQ : Unable to connect to the database:', err);
  });*/