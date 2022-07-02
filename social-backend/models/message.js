const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  body: {
    type: String,
  },
  published: {
    type: Number,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  channel: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
    },
  ],
});

module.exports = mongoose.model('Message', schema);
