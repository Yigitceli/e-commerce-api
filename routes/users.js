const express = require("express");
const usersRouter = express.Router();
const db = require("../db.js");
const passport = require("passport");


usersRouter.use("/:id", async(req, res, next) => {
  try {
    const user = await db.one("SELECT * FROM users WHERE user_id=$1", [req.params.id]);    
    req.user = user;
    req.userId = user.user_id;    
    next();
    
  } catch (error) {
    res.send(500);
        
  }
});

usersRouter.get("/:id", (req, res, next) => {
  try {
    res.send(req.user);
    
  } catch (error) {
    res.send(500);
  }
});

usersRouter.put("/:id", async (req, res, next) => {

  try {
    const user = req.user;
    console.log(user);
    await db.none('UPDATE users SET username=$1, first_name=$2, last_name=$3, password=$4, modified=$5 WHERE user_id=$6', [req.body.username, req.body.first_name, req.body.last_name, req.body.password, new Date(), req.userId]);
    res.send(202);
    
  } catch (error) {
    res.send(500);
  }
})

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await db.query("SELECT * FROM users");
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});



usersRouter.get("/login", (req, res, next) => {
  res.render("./pages/login");
});

usersRouter.get("/register", (req, res, next) => {
  res.render("./pages/register");
});

usersRouter.post("/register", async (req, res, next) => {
  const user = req.body;
  try {
    if (user.username.length < 4 || user.password.length < 4) {
      res.redirect("register");
    } else {
      await db.result("INSERT INTO users(username, password) VALUES($1, $2)", [
        user.username,
        user.password,
      ]);

      res.redirect("login");
    }
  } catch (err) {
    res.send(500);
  }
});

usersRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(200);
});

module.exports = usersRouter;
