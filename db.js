const pg =              require('pg-promise')();



const db = pg(process.env.DB_CONNECTION_STRING);


module.exports = db;