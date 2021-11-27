const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
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
})*/

const indexRoutes = require('./website/routes/index');

app.use(indexRoutes);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');

app.use(express.static('website'));

app.get('/', (req, res) => {
    res.send('./views/index', { root: __dirname });
});

app.get('/login', (req, res) => {
    res.send('./server.js/login.html', { root: __dirname });
});

app.get('/profile', (req, res) => {
    res.send('./server.js/profile.html', { root: __dirname });
});

app.post('/login', urlencodedParser, async function(req, res){
    console.log(req.body);
    var collection = DB.collection ("users");
    var users = (await collection.find({username:req.body.username}).toArray())
    if users.length === 0{
        res.send('./server.js/login.html', { root: __dirname });
    }

});

app.post('/signup', urlencodedParser, function(req,res){
    console.log(req.body);
});


app.get('/', function(req, res) {
    res.render("server.js");
})

app.listen(port, () => console.log(`listening on port ${port}!`));