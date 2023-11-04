const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    contactInfo: {
        email: {type: String},
        username: {type: String},
        password: {type: String},
    },
    name: {
        firstName: {type: String},
        middleName: {type: String},
        lastName: {type: String}
    },
    preferences: {
        contrastMode: {type: Boolean, default: false},
        hardMode: {type: Boolean, default: false},
        darkMode: {type: Boolean, default: true}
    },
    games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
    currentStreak: {type: Number, default: 0},
    maxStreak: {type: Number, default: 0},
    gameIndex: {type: Number, default: 0},

});

module.exports = mongoose.model("User", userSchema);