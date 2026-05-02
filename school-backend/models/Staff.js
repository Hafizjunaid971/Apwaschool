const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    schoolPlaceOfPosting: { type: String },
    ddoCode: { type: String },
    semisCode: { type: String },
    personalIdNo: { type: String, required: true }, // Ye "Personal (ID No)" hai
    contactNo: { type: String },
    emailAddress: { type: String },
    bankAccountNo: { type: String },
    talwka: { type: String },
    district: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);