const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentsSchema = new Schema({
  
    name: {
      type: String
    },
    enddate: {
      type: String,
    },
    endtime: {
      type: String
    },
    task: {
      data: Buffer,
      contentType: String
    }
  },
  );

module.exports = mongoose.model('Assignment', assignmentsSchema);