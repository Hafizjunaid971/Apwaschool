const Staff = require('../models/Staff');

// 1. Create Staff (POST)
exports.createStaff = async (req, res) => {
    try {
        const staff = new Staff(req.body);
        const savedStaff = await staff.save();
        res.status(201).json({ success: true, data: savedStaff });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Get All Staff (GET)
exports.getAllStaff = async (req, res) => {
    try {
        const staffList = await Staff.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: staffList });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Get Staff By ID (GET)
exports.getStaffById = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) return res.status(404).json({ success: false, message: "Staff not found" });
        res.status(200).json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Get Staff By CNIC / Personal ID (GET)
exports.getStaffByCnic = async (req, res) => {
    try {
        const staff = await Staff.findOne({ personalIdNo: req.params.cnic });
        if (!staff) return res.status(404).json({ success: false, message: "Staff not found with this ID" });
        res.status(200).json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Get Staff By Name (GET)
exports.getStaffByName = async (req, res) => {
    try {
        // Regex use kar rahe hain taake partial name se bhi search ho
        const nameRegex = new RegExp(req.params.name, 'i');
        const staffList = await Staff.find({ name: nameRegex });
        res.status(200).json({ success: true, data: staffList });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 6. Update Staff (PUT)
exports.updateStaff = async (req, res) => {
    try {
        const updatedStaff = await Staff.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedStaff) return res.status(404).json({ success: false, message: "Staff not found" });
        res.status(200).json({ success: true, data: updatedStaff });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 7. Delete Staff (DELETE)
exports.deleteStaff = async (req, res) => {
    try {
        const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
        if (!deletedStaff) return res.status(404).json({ success: false, message: "Staff not found" });
        res.status(200).json({ success: true, message: "Staff deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Bulk Import Staff from Excel (POST)
// Bulk Import Staff from Excel (POST)
// Bulk Import Staff from Excel (POST)
exports.importStaff = async (req, res) => {
    try {
        const excelData = req.body;
        
        if (!excelData || excelData.length === 0) {
            return res.status(400).json({ success: false, message: "Excel file is empty!" });
        }

        // Helper function: Excel se data nikalne ke liye
        const getVal = (key) => {
            const value = excelData[0][key] !== undefined ? key : null;
            return value !== null ? String(excelData[0][key] || "").trim() : "";
        };

        const formattedData = excelData.map(row => {
            const getValue = (key) => row[key] !== undefined ? String(row[key]).trim() : "";
            
            return {
                name: getValue("Name"),
                designation: getValue("Designation"),
                schoolPlaceOfPosting: getValue("School / Place of posting"),
                ddoCode: getValue("DDO Code / SEMIS Code"),
                semisCode: getValue("SEMIS Code") || getValue("DDO Code / SEMIS Code"),
                personalIdNo: getValue("Personal (ID No)"),
                contactNo: getValue("Contact No"),
                emailAddress: getValue("Email Address"),
                bankAccountNo: getValue("Bank Account No"),
                talwka: getValue("Talwka"),
                district: getValue("District")
            };
        });

        const validData = formattedData.filter(row => row.name && row.personalIdNo);
        
        if (validData.length === 0) {
            // YE LINE IMPORTANT HAI: YE AAPKO BATA DEGI KE EXCEL MEIN ASLI KAUN SE COLUMNS HAIN
            const actualHeaders = Object.keys(excelData[0]).join(', ');
            return res.status(400).json({ 
                success: false, 
                message: `Match nahi hua. Aapki Excel mein ye headers hain: ${actualHeaders}` 
            });
        }

        const insertedStaff = await Staff.insertMany(validData);
        res.status(201).json({ success: true, message: `${insertedStaff.length} records imported successfully!` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};