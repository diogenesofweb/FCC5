const express = require("express");
const router = express.Router();
const ShortURL = require("../models/shortURL");

// handle redirect
router.get("/:num", (req, res, next) => {
  const num = req.params.num;
  ShortURL.findOne({ short_url: num }).exec((err, url) => {
    if (err) {
      console.error(err);
    }
    if (url) {
      res.redirect(301, url.original_url);
      return res.end();
    }
    if (!url) {
      res.send({ err: "No short url found for given input" });
      return res.end();
    }
  });
});

router.post("/new", (req, res, next) => {
  // check if URL already exist, if yes - send it back, if no - add it to DB
  ShortURL.findOne({ original_url: req.body.original_url }).exec((err, url) => {
    if (err) {
      //console.error(err);
    } else if (url) {
      // console.log(url);
      res.send({
        original_url: url.original_url,
        short_url: url.short_url
      });
      return res.end();
    } else {
      // count number of documents
      const numberOfURLs = ShortURL.estimatedDocumentCount();
      // add URL & number to DB
      numberOfURLs.then(number => {
        // console.log("number of Urls : ", number);
        ShortURL.create({
          original_url: req.body.original_url,
          short_url: number
        })
          .then(url => {
            res.send({
              original_url: url.original_url,
              short_url: number
            });
          })
          .catch(err => res.status(422).send({ error: err.message }));
      });
    }
  });
});

module.exports = router;
