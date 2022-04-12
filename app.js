const express = require('express');

const app = express();

const friends = [
 {first: 'Jon', last: 'Rigby'},
 {first: 'Alan', last: 'Rugg'},
 {first: 'Manami', last: 'Kishida'}
]

// Define the view engine to use in the project
app.set('view engine', 'pug');

app.get('/', (req, res) => {
 res.render('index');
});

app.get('/cards', (req, res) => {
 res.locals.prompt = "Who is buried in Grant's tomb?";
 res.locals.hint = "Think about whose tomb it is.";
 res.render('card');
});

app.get('/sandbox', (req, res) => {
 res.locals.friends = friends;
 res.render('friends');
});

app.listen(3000, () => {
 console.log('The application is running on localhost:3000')
});