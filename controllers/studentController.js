const { Student } = require('../models');

/* Students */
exports.createStudent = async (req, res) => {
    const student = await Student.create(req.body);
    res.json(student);
  };
  exports.getAllStudents = async (req, res) => {
    const student = await Student.findAll(req.params.id, {
      include: ['classes']
    });
    res.json(student);
  };
  exports.getStudentById = async (req, res) => {
    const student = await Student.findByPk(req.params.id, {
      include: ['classes']
    });
    res.json(student);
  };
  
  exports.updateStudent = async (req, res) => {
    await Student.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  };
  
  exports.deleteStudent = async (req, res) => {
    await Student.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  };
  