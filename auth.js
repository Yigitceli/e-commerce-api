const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db.js');

passport.use(new LocalStrategy(    
    async function(username, password, done) {
        try{
            
            const user = await db.one('SELECT * FROM users WHERE username=$1', [username]);
            console.log(user);
            
            
            if(user.password !== password){
                done(null, false, {message: 'Wrong Password'});
            }else{
                done(null, user);
            }
            

        } catch(err){
            if(err.received == 0){
                done(null, false, {message: 'Wrong username'});
            }else{
                done(err);
            }

        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.user_id);
  });
  
  passport.deserializeUser(function(id, done) {
    db.one('SELECT * FROM users WHERE user_id=$1', [id]).then(user => done(user.user_id)).catch(err => done(err));
    
  });

module.exports = passport;