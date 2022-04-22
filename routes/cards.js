const express = require('express');
const router = express.Router();

// Get the flashcard data and put it into variables
const data = require('../data/flashcardData.json');

router.get('/test', (req, res) => {
    
});

router.get('/:id', (req, res) => {
    const deck = req.cookies.deck;
    const { cards } = data[deck];
    const { side } = req.query;
    const { id } = req.params;

    // If page is accessed without a query string, redirect using the query string '?side=question'
    if (!side) {
        return res.redirect(`/cards/${id}?side=question`);
    };
    
    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];
    const templateData = { id, text, name, side };

    if (side === 'question') {
        templateData.hint = hint;
        templateData.flipLink = `answer`;
    } else if (side === 'answer') {
        templateData.flipLink = `question`;
    } else { 
        // Prevent any query strings where 'side' is set to anything other than 'question' or 'answer'
        return res.redirect(`/cards/${id}?side=question`);
    }
    
    res.render('card', templateData);
});

router.get('/', (req, res) => { 
    const deck = req.cookies.deck;
    const { cards } = data[deck];
    // Write logic to find a random card
    const randomCard = Math.floor(Math.random() * cards.length);
    
    // Redirect users to view that card
    res.redirect(`/cards/${randomCard}`);
});

module.exports = router;