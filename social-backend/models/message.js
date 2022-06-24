const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  body: {
    type: String,
  },
  published: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Message', schema);
