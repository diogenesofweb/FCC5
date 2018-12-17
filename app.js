"use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();
const port = process.env.PORT || 4000;

app.set("trust proxy", true);

// connect to MongoBD
mongoose
  .connect(
    process.env.URI,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("MongoBD ready to use!");
    },
    err => {
      console.error(err);
    }
  );
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

// use body-parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// serve public page
app.use("/", express.static(__dirname + "/public"));

// initialize routes
app.use("/", require("./routes/start"));
app.use("/api/timestamp", require("./routes/timestamp"));
app.use("/api/whoami", require("./routes/requestHeaderParser"));
app.use("/api/shorturl", require("./routes/shorturl"));
app.use("/api/exercise", require("./routes/exerciseTracker"));
app.use("/api/upfile", require("./routes/upfile"));

// error handling middleware
app.use((err, req, res, next) => {
  //console.error(err);
  res.status(422).send({ error: err.message });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
