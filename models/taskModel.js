const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
  title: {
    type: String, required: true
  },
  body: {
    type: String, required: true
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'users'
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model('tasks', taskSchema);