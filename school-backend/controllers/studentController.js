const Student = require('../models/Student');

// 1. Create Student (POST)
exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.status(201).json({ success: true, data: savedStudent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Get All Students (GET)
exports.getAllStudents = async (req, res) => {
    try {
        // Agar URL mein class name bheja hai (e.g /api/students?className=KG1) toh wo filter karega, warna sab de dega
        const { className } = req.query;
        const students = className ? await Student.find({ className }) : await Student.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Get Student By GR Number (GET)
exports.getStudentByGrNo = async (req, res) => {
    try {
        const student = await Student.findOne({ grNo: req.params.grNo });
        if (!student) return res.status(404).json({ success: false, message: "Student not found with this GR#" });
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Get Student By Name (GET)
exports.getStudentByName = async (req, res) => {
    try {
        const nameRegex = new RegExp(req.params.name, 'i');
        const students = await Student.find({ studentName: nameRegex });
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Student By ID (GET)
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Update Student (PUT)
exports.updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedStudent) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, data: updatedStudent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 6. Delete Student (DELETE)
exports.deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Bulk Import Students (POST)
// Bulk Import Students (POST)
// Bulk Import Students (POST)
exports.importStudents = async (req, res) => {
    try {
        const excelData = req.body;
        if (!excelData || excelData.length === 0) return res.status(400).json({ message: "Excel file is empty!" });

        const formattedData = excelData.map(row => {
            const getValue = (key) => row[key] !== undefined ? String(row[key]).trim() : "";
            
            // CLASS NAME AUTO-FORMAT (5 ko Class 5 bana dega)
            let classVal = getValue("Class");
            if (!isNaN(classVal) && classVal !== "") {
                classVal = "Class " + classVal; 
            } else if (classVal.toLowerCase() === "kg1" || classVal.toLowerCase() === "kg-1") {
                classVal = "KG1";
            } else if (classVal.toLowerCase() === "kg2" || classVal.toLowerCase() === "kg-2") {
                classVal = "KG2";
            }

            return {
                grNo: getValue("GR#"),
                studentName: getValue("Student Name"),
                fatherName: getValue("Father's Name"),
                gender: getValue("Gender"),
                studentBForm: getValue("Student's B-Form"),
                dob: getValue("Date of Birth (DD/MM/YY)"),
                religion: getValue("Religion"),
                doa: getValue("Date of Admission (DD/MM/YY)"),
                fatherMotherName: getValue("Father/Mother's CNIC"),
                guardianName: getValue("Guardian Name"),
                guardianCnic: getValue("Guardian CNIC"),
                relationWith: getValue("Relation with Guardian"),
                contactNumber: getValue("Contact Number"),
                disability: getValue("Disability if Any"),
                vaccinated: getValue("Vaccinated (Yes/No)"),
                className: classVal,
                remarks: getValue("New Enroll / Remarks")
            };
        })
        .filter(row => {
            const validClasses = ['KG1', 'KG2', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
            return row.grNo && row.studentName && validClasses.includes(row.className);
        });

        if (formattedData.length === 0) {
            return res.status(400).json({ message: "Valid data nahi mila. GR#, Name aur Class check karein." });
        }

        await Student.insertMany(formattedData);
        res.status(201).json({ success: true, message: `${formattedData.length} students imported to their classes!` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};