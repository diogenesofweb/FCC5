const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const ShortURLSchema = new Schema({
  original_url: {
    type: String,
    validate: {
      validator: value => validator.isURL(value, { require_protocol: true }),
      message: props => `${props.value} is not a valid URL!`
    },
    required: [true, "URL field is required"]
  },
  short_url: {
    type: Number
  }
});

const ShortURL = mongoose.model("shortURL", ShortURLSchema);

module.exports = ShortURL;
