const express = require("express");
const router1 = express.Router();

router1.get("/", (req, res, next) => {
  res.send("hello");
});

module.exports = router1;
