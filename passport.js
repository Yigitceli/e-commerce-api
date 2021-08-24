const passport = require("passport");
const localStrategy = require("passport").Strategy;
const db = require("./db");

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const result = await db.query("SELECT * FROM test WHERE username=$1", [
      username,
    ]);

    if (result) {
      done(null, result[0]);
    }
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const result = await db.query("SELECT * FROM test WHERE username=$1", [
        username,
      ]);
      if (!result) {
        done(null, false, "There is no user with that username");
      }
      if (result[0].password !== password) {
        done(null, false, "Password is incorrect");
      }
      done(null, result[0]);
    } catch (err) {
      done(err, false);
    }
  })
);
