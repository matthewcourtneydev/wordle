
const express = require('express');
const mongoose = require('mongoose');

const port = 3000;
const app = express();

mongoose.connect("mongodb://localhost/wordle", { useNewUrlParser: true})
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('mongoose wordle db is open');
});

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  app.listen(port, () => {
    console.log('app is running on port ', port)
  })
