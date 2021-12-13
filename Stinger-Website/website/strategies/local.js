const LocalStrategy = require('passport-local');
const passport = require('passport');
const MongoDB = require('mongodb').MongoClient;
var client = new MongoClient ("mongodb+srv://Student:CorgisAreDope@cluster0.h6c8l.mongodb.net/test?authSource=admin&replicaSet=atlas-13gy8k-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true");
var db = client.db("myProject");

MongoClient.connect("mongodb+srv://Student:CorgisAreDope@cluster0.h6c8l.mongodb.net/test?authSource=admin&replicaSet=atlas-13gy8k-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", function (err) {
 
  db.collection('people').find().toArray(function (result) {
    if (err) throw err

    console.log(result)
  })
})

passport.serializeUser((user, done) => {
  done(null, user.username);
})

passport.deserializeUser((username, done) => {
  const result = await db.promise().query(`SELECT * FROM USERS WHERE USERNAME = '${username}'`);
  try {
    if (result[0][0]) {
      done(null, result[0][0]);
    }
  } catch (err) {
    done(err, null);
  }
})

const res = require('express/lib/response');
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const result = await db.promise().query(`SELECT * FROM USERS WHERE USERNAME = '${username}'`);
      if (result[0].length === 0) {
        done(null, false);
      } else {
        if (result[0].password === password) {
          done(null, result[0][0]);
        } else {
          done(null, false);
        }
      }
    } catch (err) {
      done(err, false);
    }
  }
));

module.exports = router;