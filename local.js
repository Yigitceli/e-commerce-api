const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const db = require("./db.js");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.find((item) => item.username === username);
      if (!user) {
        done(null, false, { message: "Invalid Username" });
      }
      if (user.password !== password) {
        done(null, false, { message: "Invalid Password" });
      } else {
        done(null, user);
      }
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    const user = await db.find((item) => item.username === username);
    done(null, user);
});
