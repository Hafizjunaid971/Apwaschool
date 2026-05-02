const express = require('express');
const router = express.Router();
//const studentController = require('../controllers/studentController');
const { createStudent, getAllStudents, getStudentByGrNo, getStudentByName,getStudentById, updateStudent, deleteStudent, importStudents } = require('../controllers/studentController');

router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/gr/:grNo', getStudentByGrNo); // GR number wala route upar rakhna hai
router.get('/name/:name', getStudentByName); // Name wala route upar rakhna hai
router.get('/:id', getStudentById); // (Optional: Main ne controller mein nahi likha isko, agar chahiye toh batao)
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.post('/import', importStudents);
module.exports = router;