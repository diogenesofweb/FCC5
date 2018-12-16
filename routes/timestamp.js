const express = require("express");
const routerT = express.Router();
const moment = require("moment");
moment().format();

routerT.get("/:date_string", (req, res, next) => {
  let date = req.params.date_string;
  let isDate = new Date(date),
    isDate2 = +date > 0 ? new Date(+date) : null;

  if (isDate2) {
    res.send({
      unix: isDate2.valueOf(), // Unix timestamp (milliseconds)
      utc: moment(isDate2).format("dddd, MMMM Do YYYY, h:mm:ss a")
    });
    return res.end();
  }

  if (isDate) {
    res.send({
      unix: isDate.valueOf(), // Unix timestamp (milliseconds)
      utc: moment(isDate).format("dddd, MMMM Do YYYY, h:mm:ss a")
    });
    return res.end();
  }

  res.send({ unix: null, utc: "Invalid Date" });
  return res.end();
});

routerT.get("/", (req, res, next) => {
  res.send({
    unix: moment().valueOf(), // Unix timestamp (milliseconds)
    utc: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
  });
});

module.exports = routerT;
