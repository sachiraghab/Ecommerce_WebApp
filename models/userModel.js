const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  list: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "tasks"
  }]
});

const User = mongoose.model('users', userSchema);
module.exports = User;