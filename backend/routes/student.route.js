const express = require('express');
const app = express();
const studentRoute = express.Router();

var multer = require('multer');
var mongoose = require('mongoose');
var fs = require('fs');
var Schema = mongoose.Schema;

// Student model
let Student = require('../model/Student');
let Submission = require('../model/submissionSchema');
let Assignment = require('../model/assignmentsSchema');

// Add Student
studentRoute.route('/add-student').post((req, res, next) => {
  Student.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all student
studentRoute.route('/').get((req, res) => {
  Student.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single student
studentRoute.route('/read-student/:id').get((req, res) => {
  Student.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update student
studentRoute.route('/update-student/:id').put((req, res, next) => {
  Student.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Student successfully updated!')
    }
  })
})

// Delete student
studentRoute.route('/delete-student/:id').delete((req, res, next) => {
  Student.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
// Submission of Assignment routes

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, 'assignments/' + file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')

studentRoute.post('/upload', upload, (req, res, next) => {
  const date = String(req.body.date)
  const time = String(req.body.time)
  console.log("i atleast reachde here")
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
  })
  const assignment = new Assignment({
    name: req.file.originalname,
  })
  assignment.enddate = date
  assignment.endtime = time
  assignment.task.data = fs.readFileSync(req.file.path);
  assignment.task.contentType = req.file.mimetype;
  assignment.save((err, rec) => {
    if (err)
      res.json({
        success: false,
        err: err
      })
    else
      res.json({
        success: true,
        data: rec
      })
  })
});

studentRoute.get('/getassignments', (req, res) => {
  Assignment.find({}, (err, rec) => {
    if (err)
      res.json({
        success: false,
        err: err.name
      })
    else if (rec.length > 0) {
      res.json({
        success: true,
        rec: rec
      })
    }
    else {
      res.json({
        success: false,
        err: 'No Assignments Found'
      })

    }

  })
})

studentRoute.delete('/deleteassignment/:id', (req, res) => {
  Assignment.findByIdAndRemove(req.params.id, (err, data) => {
    if (err)
      res.json({
        success: false,
      })
    else {
      res.json({
        success: true,
        rec: data
      })
    }
  })
})

studentRoute.post('/submitassignment', upload, (req, res) => {
  const data = req.body
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
  })
  const submission = new Submission(data)
  console.log(data)
  submission.task.data = fs.readFileSync(req.file.path);
  submission.task.contentType = req.file.mimetype;
  submission.save((err, data) => {
    if (err) {
      res.json({
        success: false
      })
    }
    else {
      res.json({
        success: true,
        data: data
      })
    }
  })
})

studentRoute.get('/getsubmission/:id', (req, res) => {
  Submission.find({ assignment_id: req.params.id }, (err, rec) => {
    if (err)
      res.json({
        success: false,
        err: err.name
      })
    else if (rec.length > 0) {
      res.json({
        success: true,
        rec: rec
      })
    }
    else {
      res.json({
        success: false,
        err: 'No Data Found'
      })
    }
  })
})

studentRoute.patch('/updatemarks', (req, res) => {
  Submission.findById(req.body.id, (err, data) => {
    if (err)
      res.json({
        success: false,
        err: err.name
      })
    else if (data) {
      data.marks = req.body.marks
      data.save((err, data) => {
        if (err)
          res.json({
            success: false,
            err: err.name
          })
        else {
          res.json({
            success: true,
            data: data
          })
        }
      })
    } else {
      res.json({
        success: false,
        err: 'Not Found'
      })
    }
  })
})

module.exports = studentRoute;