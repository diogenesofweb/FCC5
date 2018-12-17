const express = require("express");
const routerS = express.Router();

routerS.get("/", (req, res, next) => {
  res.send("hello");
});

module.exports = routerS;
