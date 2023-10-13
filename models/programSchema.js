const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  field: {
    type: Array,
  },
  eligibility: {
    type: Array,
  },
  type: {
    type: String,
  },
  cost: {
    type: Number,
  },
  salary: {
    type: Number,
  },
  location: {
    type: String,
  },
  virtual: {
    type: Boolean,
  },
  website: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
