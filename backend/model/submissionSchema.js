const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    studentname: {
      type: String,
    },
    filename: {
      type: String
    },
    assignment_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Assignment'
    },
    submitted_at: {
      type: Date
    },
    task: {
      data: Buffer,
      contentType: String
    },
    marks: {
      type: String,
      default: 'Not Marked'
    }
  })

module.exports = mongoose.model('Submission', submissionSchema);
  