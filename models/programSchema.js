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
    // Eligibility is now an object that can contain age range or grades
      range: [Number],
      eligType: String  // 'Age' or 'Grade'
  },

  cost: {
    // Cost is now an object that includes the amount and the type (Cost or Stipend)
      amount: Number,
      costType: String  // 'Cost' or 'Stipend'

  },
  paymentType: {
    type: String,  // Additional field for payment type
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
    type: String,  // Changed to String to accommodate 'Year-round', season names, or Date
  },
  endDate: {
    type: String,  // Changed to String for the same reasons as startDate
  },
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
