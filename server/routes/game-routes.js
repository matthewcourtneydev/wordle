const express = require('express');
const gameRouter = express.Router();
const Game = require('../models/game');

gameRouter.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games)
    } catch(err) {
        console.log('ERRROORRRRRRRRR', err)
        res.json({err: err})
    }
})


gameRouter.post('/', async (req, res) => {
    const newGame = new Game({
        won: req.body.won,
        totalGuesses: req.body.totalGuesses,
        guesses: req.body.guesses,
        word: req.body.word,
        hardMode: req.body.hardMode
    });

    try {
        const savedGame = await newGame.save();
        res.json(savedGame);
    } catch(err) {
        res.json({err: err})
    }
});

module.exports = gameRouter;