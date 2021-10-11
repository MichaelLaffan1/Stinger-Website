let express = require('express');
let app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello");
});

app.get('/landing', function(req, res) {
    res.render("landing");
})