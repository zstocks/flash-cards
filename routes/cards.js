const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.locals.prompt = "Who is buried in Grant's tomb?";
    res.locals.hint = "Think about whose tomb it is.";
    res.render('card');
});

module.exports = router;