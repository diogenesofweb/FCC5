const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Exercises = new Schema({
  description: {
    type: String,
    maxlength: 60,
    required: [true, "description field is required"]
  },
  duration: {
    type: Number,
    min: [1, "Too few minutes"],
    max: [1440, "One day has only 1440 minutes"],
    required: [true, "duration field is required"]
  },
  date: { type: Date, default: Date.now },
  _id: false
});

const userET = new Schema({
  name: {
    type: String,
    maxlength: 30,
    required: [true, "name field is required"]
  },
  exercises: [Exercises]
});

// create exerciseTracker model
const UserET = mongoose.model("exerciseTracker", userET);

module.exports = UserET;
