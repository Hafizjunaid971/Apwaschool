// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//     semisCode: { type: String },
//     district: { type: String },
//     schoolName: { type: String },
//     grNo: { type: String, required: true },
//     studentName: { type: String, required: true },
//     fatherName: { type: String, required: true },
//     dob: { type: Date },
//     doa: { type: Date }, // Date of Admission
//     gender: { type: String, enum: ['Male', 'Female', 'Other'] },
//     className: { 
//         type: String, 
//         required: true, 
//         enum: ['KG1', 'KG2', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'] 
//     },    section: { type: String },
//     bFormCnic: { type: String, required: true }, // Student ka B-form
//     guardianName: { type: String },
//     guardianCnic: { type: String },
//     guardianContact: { type: String },
//     address: { type: String }
// }, { timestamps: true });

// module.exports = mongoose.model('Student', studentSchema);

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    grNo: { type: String, required: true },
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },
    gender: { type: String },
    studentBForm: { type: String }, // Student's B - Form
    dob: { type: String }, // Date of Birth (DD/MM/YY)
    religion: { type: String },
    doa: { type: String }, // Date of Admission
    fatherMotherName: { type: String },
    guardianCnic: { type: String },
    guardianName: {type: String},
    relationWith: { type: String }, // Relation with
    contactNumber: { type: String },
    disability: { type: String }, // Disability if Any
    vaccinated: { type: String }, // Vaccinated (Yes/No)
    className: { type: String, required: true, enum: ['KG1', 'KG2', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'] },
    remarks: { type: String } // New Enroll / Remarks
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);