let express = require('express');
let router = express.Router();

router.get("/", function (req, res) {
    res.render('../views/signup')
})

module.exports = router;