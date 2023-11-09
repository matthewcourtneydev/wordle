const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    won: {type: Boolean},
    totalGuesses: {type: Number},
    guesses: [[
        {
            letter: {type: String},
            isCorrect: {type: String}
        }
    ]],
    word: [{type:String}],
    hardMode: {type: Boolean}
});

module.exports = mongoose.model("Game", gameSchema);