const express = require('express');
const router = express.Router();

const profileRoutes = require('./profiles');
const teacherRoutes = require('./teachers');
const studentRoutes = require('./students');
const classRoutes = require('./classes');

// // Use routes
router.use('/profiles', profileRoutes);
router.use('/teachers', teacherRoutes);
router.use('/students', studentRoutes);
router.use('/classes', classRoutes);

module.exports = router;
