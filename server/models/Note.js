"use strict";

let mg = require('mongoose')

module.exports = mg.model('Note', new mg.Schema({
  body: {
    type: String,
    required: true
  },
  article: {
    type: mg.Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  }
}))