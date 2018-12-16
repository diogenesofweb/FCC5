const express = require("express");
const routerHP = express.Router();

routerHP.get("/", (req, res, next) => {
  //console.log(JSON.stringify(req.headers));
  res.send({
    ipaddress: req.ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  });
  res.end();
});

module.exports = routerHP;
