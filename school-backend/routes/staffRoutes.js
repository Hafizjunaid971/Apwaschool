const express = require('express');
const router = express.Router();

// Sirf ye ek line chahiye (staffController wali hatado)
const { createStaff, getAllStaff, getStaffById, getStaffByCnic, getStaffByName, updateStaff, deleteStaff, importStaff } = require('../controllers/staffController');

// Routes Order (Import ko pehle rakh diya hai)
router.post('/import', importStaff);
router.post('/', createStaff);
router.get('/', getAllStaff);
router.get('/name/:name', getStaffByName); 
router.get('/cnic/:cnic', getStaffByCnic); 
router.get('/:id', getStaffById);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

module.exports = router;