const pgp = require("pg-promise")();
const db = pgp({
  host: "localhost",
  port: 5432,
  database: "e-commerce",
  user: "postgres",
  password: "14561456",
  max: 30,
});

const test = async () => {
  const result = await db.query("SELECT * FROM test WHERE username=$1", [
    "yigitceli",
  ]);
  console.log(result[0].password);
};

//test();

const users = [{id:1, username: 'yigitceli', password: '12345'}, {id:2, username: 'fazilet', password: '123456'}];
const result = users.find(item => item.username === 'yigitceli');

module.exports = users;
