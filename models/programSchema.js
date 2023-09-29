const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
    },
    eligibility: {
        age: Number,
        year: Number
    },
    type: {
        type: String,
        // enum: ['Internship', 'Research', 'Course', etc.]
    },
    cost: {
        type: String,
    },
    location: {
        type: String,
    },
    virtual: {
        type: Boolean,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate : { 
        type: Date
    },
    website: {
        type: String,
        required: true,
    },
    applicationDeadline: {
        type: Date
    },
    description: {
        type: String
    }
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
