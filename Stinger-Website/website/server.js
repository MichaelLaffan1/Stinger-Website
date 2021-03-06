const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
let path = require('path')
// const passport = require('passport');
// const local = require('./strategies/local.js');

// const authRoute = require('./routes/auth.js');

//Sets up the post commands
app.use(express.urlencoded({extended: true}));
app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//EJS setup
app.set('view engine', 'ejs');

//Connects the database to the webpages
var MongoClient = require('mongodb').MongoClient
var client = new MongoClient ("mongodb+srv://Student:CorgisAreDope@cluster0.h6c8l.mongodb.net/test?authSource=admin&replicaSet=atlas-13gy8k-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
client.connect();
var db = client.db("myProject");

MongoClient.connect("mongodb+srv://Student:CorgisAreDope@cluster0.h6c8l.mongodb.net/test?authSource=admin&replicaSet=atlas-13gy8k-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", function (err) {
  db.collection('people').find().toArray(function (result) {
    if (err) throw err
    console.log(result)
  })
})

// Collects data from fields to log the user in
app.get('/login', urlencodedParser, async function(req, res){
    console.log('Login Page');
    var collection = db.collection ("people");
    if (req.query.username != undefined&&req.query.password!= undefined){
        var users = (await collection.find({username:req.query.username}).toArray())
    console.log(users)
    console.log("username from query: " + users[0].username);
    console.log("password from query: " + users[0].password);
    console.log("username from req: " + req.query.username);
    console.log("password from req: " + req.query.password);
    if (req.query.username == users[0].username&&req.query.password == users[0].password){
        console.log('User logged in')
    } else if(req.query.username == users[0].username&&req.query.password != users[0].password){
        console.log('Incorrect Password')
    }else{
        console.log('User needs to sign up');
    }
}
    console.log(req.query.username);
    res.render('login');
});

//Sets the public folder to host all of the static files
app.use(express.static('public'));

//Setting the routes up in order to render the websites
const indexRoutes = require('./routes/index.js');
app.use(indexRoutes);

const loginRoutes = require('./routes/login.js');
app.use(loginRoutes);

const contactRoutes = require('./routes/contact.js');
app.use(contactRoutes);

const profile1Routes = require('./routes/profile1.js');
app.use(profile1Routes);

const signupRoutes = require('./routes/signup.js');
app.use(signupRoutes);

const aboutRoutes = require('./routes/about.js');
app.use(aboutRoutes);

//app.use(passport.initialize());
//app.use(passport.session());

//Sending the files to load on the localhost
app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/profile1', (req, res) => {
    res.render('profile1');
});

app.get('/about', (req, res) => {
    res.render('about');
});

//Collects the data from the fields to sign the user up
app.get('/signup', async function(req, res){
    res.render('signup');
    console.log("Signup successful");

    console.log("username from req: " + req.query.username);
    console.log("password from req: " + req.query.password);
    var collection = db.collection ("people");
    var users = (await collection.find({username:req.query.username}).toArray());

    if(users.length === 0) {
        console.log('User saved to database')
        collection.insertOne({username:req.query.username, password:req.query.password});
    }
    else {
        console.log('A user already exists');  
    }
    console.log(collection.countDocuments() );
});

app.post('/login', urlencodedParser, function(req, res){
    console.log(req.body);
});

app.post('/signup', urlencodedParser, function(req,res){
    console.log(req.body);
});

app.post('/login', urlencodedParser, function(req, res){
    console.log(req.body);
});

app.post('/signup', urlencodedParser, function(req,res){
    console.log(req.body);
});


//500 error to clarify if something broke
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

//404 error to show if a page wasn't found
app.use(function (req, res, next) {
    res.status(404).send("404 Not Found")
})

app.listen(port, () => console.log(`listening on port ${port}!`));