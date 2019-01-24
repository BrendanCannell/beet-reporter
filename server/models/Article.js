"use strict";

let mg = require('mongoose')

module.exports = mg.model('Article', new mg.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  image: {
    type: String
  }
}))