const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const shortURLSchema = new Schema({
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
// if URL is valid but allredy exist in DB, it will be handle in POST request

// create url model
const ShortURL = mongoose.model("shortURL", shortURLSchema);

module.exports = ShortURL;
