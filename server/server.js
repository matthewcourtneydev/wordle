const express = require("express");
const mongoose = require("mongoose");
const gameRouter = require("./routes/game-routes");

const port = 3001;
const app = express();

mongoose.connect("mongodb://localhost/wordle", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("mongoose wordle db is open");
});

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use('/games', gameRouter);
app.listen(port, () => {
  console.log("app is running on port ", port);
});
