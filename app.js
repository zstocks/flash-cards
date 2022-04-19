const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Define the view engine to use in the project
app.set('view engine', 'pug');

// Middleware
app.use((req, res, next) => { 
    console.log('Hello');
    next();
});

app.use((req, res, next) => {
    console.log('World');
    next();
});




// Define Routes
// GET
app.get('/', (req, res) => {

    const name = req.cookies.username;

    // Only display the / route if the username cookie has been set
    if (name) {
        res.render('index', { name });
    } else { 
        res.redirect('/hello');
    }

});

app.get('/cards', (req, res) => {
 res.locals.prompt = "Who is buried in Grant's tomb?";
 res.locals.hint = "Think about whose tomb it is.";
 res.render('card');
});

app.get('/hello', (req, res) => {

    const name = req.cookies.username;

    // Only display the hello template if username is *NOT* set
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }

});

//POST
app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

app.use((req, res, next) => { 
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => { 
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

// Define server
app.listen(3000, () => {
 console.log('The application is running on localhost:3000')
});