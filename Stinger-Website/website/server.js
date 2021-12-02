const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
let path = require('path')

//Sets up the post commands
app.use(express.urlencoded({extended: true}));
app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//EJS setup
app.set('view engine', 'ejs');

var MongoClient = require('mongodb').MongoClient
var client= new MongoClient ("mongodb+srv://Student:CorgisAreDope@cluster0.h6c8l.mongodb.net/test?authSource=admin&replicaSet=atlas-13gy8k-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
client.connect();
var DB = client.db("myProject");

/*MongoClient.connect("mongodb+srv://Student:CorgisAreDope@cluster0.h6c8l.mongodb.net/test?authSource=admin&replicaSet=atlas-13gy8k-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", function (err, client) {
  if (err) throw err

  var db = client.db('myFirstDatabase')

  db.collection('students').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})

app.post('/login', urlencodedParser, async function(req, res){
    console.log(req.body);
    var collection = DB.collection ("users");
    var users = (await collection.find({username:req.body.username}).toArray())
    if users.length === 0{
        res.send('./server.js/login.html', { root: __dirname });
    }

});*/

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


//Sending the files to load on the localhost

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/profile', (req, res) => {
    res.render('profile1');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

/*
app.post('/login', urlencodedParser, function(req, res){
    console.log(req.body);
});

app.post('/signup', urlencodedParser, function(req,res){
    console.log(req.body);
});*/

app.post('/login', urlencodedParser, function(req, res){
    console.log(req.body);
});

app.post('/signup', urlencodedParser, function(req,res){
    console.log(req.body);
});

app.listen(port, () => console.log(`listening on port ${port}!`));