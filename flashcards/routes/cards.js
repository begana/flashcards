const express = require('express');
const router = express.Router();

const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', ( req,res ) => {
    const numberOfCards = cards.length;
    const randomId = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/cards/${randomId}?side=question`);
});

router.get('/:id', ( req,res ) => {
    const name = req.cookies.username;
    const { id } = req.params;
    const { side } = req.query;
    const text = cards[id][side];
    const { hint } = cards[id];
    const templateData = { text, id, name }

    if( !side || side === 'hint' ){
        res.redirect(`${id}?side=question`);
    }
    
    if( side === 'question' ){
        templateData.hint = hint;
        templateData.sideToMove = 'answer';
        templateData.sideToDisplay = "ANSWER";
    } else if( side === 'answer' ){
        templateData.sideToMove = 'question';
        templateData.sideToDisplay = "QUESTION";
    }

    res.render('card', templateData );
});

module.exports = router;