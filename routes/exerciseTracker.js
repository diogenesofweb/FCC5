const express = require("express");
const routerExer = express.Router();
const userET = require("../models/userET");
const validator = require("validator");

// Create new user
routerExer.post("/new-user", (req, res, next) => {
  // check if user already exist, if yes - send message, if no - add it to DB
  // console.log(req.body);
  userET.findOne({ name: req.body.user }).exec((err, user) => {
    if (err) {
      //  console.error(err);
    } else if (user) {
      // console.log(user);
      res.send({
        err: "User name already taken"
      });
      return res.end();
    } else {
      // add user to DB
      userET
        .create({ name: req.body.user })
        .then(user => {
          res.send(user);
        })
        .catch(err => res.send({ error: err.message }));
    }
  });
});

// GETting all users
routerExer.get("/users", (req, res, next) => {
  userET
    .find({})
    .select("_id name")
    .then(users => res.send(users))
    .catch(err => res.send({ error: err.message }));
});

// add an exercise to any user by POSTing form
routerExer.post("/add", (req, res, next) => {
  // check if userID is correct, if no - send message, if yes - add exercises to DB
  // console.log(req.body);
  userET.findOneAndUpdate(
    { _id: req.body.userID },
    {
      $push: {
        exercises: {
          description: req.body.description,
          duration: Math.floor(req.body.duration),
          date: req.body.date === "" ? new Date() : req.body.date
        }
      }
    },
    { runValidators: true, new: true },
    (err, user) => {
      if (err) {
        // console.log("Something wrong when updating data!");
        res.send({ error: err.message });
      }
      res.send(user);
    }
  );
  // Or without update validation
  /* userET.findByIdAndUpdate(
    req.body.id,
    { $push: { exercises: req.body.exercise } },
    { new: true },
    (err, user) => {
      if (err) {res.send({ error: err.message })}
      res.send(user);
    }
  );*/
});

// GETting full exercise array of any user
routerExer.get("/log", (req, res, next) => {
  //console.log({ req: req.query });
  const { userId, from, to, limit } = req.query;
  userET
    .findById(userId)
    .lean()
    .then(user => {
      // filter by dates
      const arr = user.exercises;
      const arr1 =
        validator.toDate(from || "") !== null
          ? arr.filter(x => x.date >= new Date(from))
          : arr;
      const arr2 =
        validator.toDate(to || "") !== null
          ? arr1.filter(x => x.date < new Date(to))
          : arr1;

      // set limit
      const limit1 = parseFloat(limit);
      const len = arr2.length;
      const count = len > limit1 ? limit1 : len;

      res.send({
        count,
        ...user,
        exercises: arr2.slice(len - limit1 || 0)
      });
    })
    .catch(err => res.send({ error: err.message }));
});

module.exports = routerExer;
