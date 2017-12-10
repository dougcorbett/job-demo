const mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },  
  locationCity: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  locationState: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  company: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  type: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  payRate: {
    type: Number,
    required: false
  },
  payPeriod: {
    type: String,
    required: false,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  datePosted: {
    type: Date,
    required: true
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

var Job = mongoose.model('Job', JobSchema);

module.exports = {Job}