const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;

    if (!side) {
        return res.redirect(`/cards/${id}?side=question`);
    };

    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];
    const templateData = { id, text, name };

    if (side === 'question') {
        templateData.hint = hint;
        templateData.flipLink = `answer`;
        templateData.flipText = 'Answer';
    } else if (side === 'answer') {
        templateData.flipLink = `question`;
        templateData.flipText = 'Question';
    } else { 
        return res.redirect(`/cards/${id}?side=question`);
    }
    
    res.render('card', templateData);
});

router.get('/', (req, res) => { 
    // Write logic to find a random card
    const randomCard = Math.floor(Math.random() * cards.length);
    
    // Redirect users to view that card
    res.redirect(`/cards/${randomCard}`);
});



module.exports = router;