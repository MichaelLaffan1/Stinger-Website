const express = require('express');
const app = express();
const port = 3000;



app.use(express.static('website'));


app.get('/', (req, res) => {
    res.send('index.html', { root: __dirname });
});


app.get('/profile', (req, res) => {
    res.send('./server.js/profile.html', { root: __dirname });
});

app.get('/login', (req, res) => {
    res.send('./server.js/login.html', { root: __dirname });
});

app.get('/', function(req, res) {
    res.render("server.js");
})

app.listen(port, () => console.log(`listening on port ${port}!`));