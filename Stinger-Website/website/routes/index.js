let express = require('express');
let router = express.Router();

router.get("/", function (req, res) {
    res.render('../website/views/index')
})

module.exports = router;