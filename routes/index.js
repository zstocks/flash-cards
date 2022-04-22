const express = require('express');
const router = express.Router();

// GET
router.get('/', (req, res) => {

    const name = req.cookies.username;

    // Only display the / route if the username cookie has been set
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello');
    }

});

router.get('/hello', (req, res) => {

    const name = req.cookies.username;

    // Only display the hello template if username is *NOT* set
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }

});

//POST
router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.render('deck');
});

router.post('/deck', (req, res) => {
    res.cookie('deck', req.body.deck);
    res.redirect('/');
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.clearCookie('deck');
    res.redirect('/hello');
});

module.exports = router;