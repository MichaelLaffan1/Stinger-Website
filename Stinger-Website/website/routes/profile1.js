let express = require('express');
let router = express.Router();

router.get("/", function (req, res) {
    res.render('../views/profile1')
})

module.exports = router;