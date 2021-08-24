const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'e-commerce',
    user: 'postgres',
    password: '14561456',
    max: 30
});

const result = db.query('SELECT * FROM test WHERE username=$1', ['yigitceli']).then(result => console.log(result));


module.exports = db;