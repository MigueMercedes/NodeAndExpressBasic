let express = require("express");
let app = express();
require("dotenv").config();

app.use("/public", express.static(__dirname + "/public"));

let response;

app.use((req, res, next) => {
  response = `${req.method} ${req.path} - ${req.ip}`;
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = response.toUpperCase();
  }
  res.json({ message: response });
});

app.get("/now", (req, res, next) => {
    req.time = new Date().toString()
    next()
}, (req, res) => {
  res.json({ time: req.time })
})

module.exports = app;
