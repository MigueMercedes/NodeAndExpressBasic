let express = require("express");
let app = express();
require("dotenv").config();

app.use("/public", express.static(__dirname + "/public"));

let response;

app.use((req, res, next) => {
  response = `${req.method} ${req.path} - ${req.ip}`;
  next();
});

const returnDate = (req, res, next) => {
  res.json({ date: new Date().toString() });
  next();
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = response.toUpperCase();
  }
  res.json({ message: response });
});

app.get("/now", returnDate, (req, res) => {
  res.json({ time: new Date().toString() });
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({ echo: word });
});

app.route("/name").get((req, res) => {
  const { first, last } = req.query;
  res.json({ name: `${first} ${last}` });
});

module.exports = app;
