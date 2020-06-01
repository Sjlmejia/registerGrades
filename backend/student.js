const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema(
  
  {
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    task: {type: String, required: false},
    test: {type: String, required: false},
  });

module.exports = mongoose.model('Student', studentSchema);
