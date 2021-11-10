const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

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

app.post('/login', urlencodedParser, function(req, res){
    console.log(req.body);
});

app.post('/signup', urlencodedParser, function(req,res){
    console.log(req.body);
});


app.get('/', function(req, res) {
    res.render("server.js");
})

app.listen(port, () => console.log(`listening on port ${port}!`));