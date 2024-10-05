const { Class } = require('../models');

/* Classes */
exports.createClass = async (req, res) => {
    const newClass = await Class.create(req.body);
    res.json(newClass);
  };
  
  exports.getClassById = async (req, res) => {
    const classData = await Class.findByPk(req.params.id, {
      include: ['teacher', 'Students']
    });
    res.json(classData);
  };
  exports.getAllClasses = async (req, res) => {
    const classData = await Class.findAll(req.params.id, {
      include: ['teacher', 'Students']
    });
    res.json(classData);
  };
  exports.updateClass = async (req, res) => {
    await Class.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  };
  
  exports.deleteClass = async (req, res) => {
    await Class.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  };
  // Add a Class to a Class
  exports.addStudentToClass = async (req, res) => {
    const classData = await Class.findByPk(req.params.classId);
    const Student = await Student.findByPk(req.params.ClassId);
    await classData.addClass(Student);
    res.json({ success: true });
  };
  
  // Get Classs in a Class
  exports.getClassWithStudents = async (req, res) => {
    const classData = await Class.findByPk(req.params.id, {
      include: ['Students']
    });
    res.json(classData.Classs);
  };
  