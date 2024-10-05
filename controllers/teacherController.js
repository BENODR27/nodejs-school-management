const { Teacher } = require('../models');

/* Teachers */
exports.createTeacher = async (req, res) => {
    try {
      const teacher = await Teacher.create(req.body);
      res.status(201).json(teacher);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        // Validation errors
        res.status(400).json({
          errors: error.errors.map(e => e.message)
        });
      } else {
        // Other errors
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
  
  exports.getAllTeachers = async (req, res) => {
    const teacher = await Teacher.findAll({
      include: ['classes','profile']
    });
    res.json(teacher);
  };
  exports.getTeacherById = async (req, res) => {
    const teacher = await Teacher.findByPk(req.params.id, {
      include: ['classes','profile']
    });
    res.json(teacher);
  };
  
  exports.updateTeacher =  async (req, res) => {
    await Teacher.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  };
  
  exports.deleteTeacher =  async (req, res) => {
    await Teacher.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  };
  // Create a Profile for a Teacher
  exports.createTeacherWithProfile =  async (req, res) => {
    const teacher = await Teacher.findByPk(req.params.id);
    const profile = await teacher.createProfile(req.body);
    res.json(profile);
  };
  
  // Get a Teacher's Profile
  exports.getTeacherWithProfile = async (req, res) => {
    const profile = await Profile.findOne({
      where: { teacherId: req.params.id }
    });
    res.json(profile);
  };
  
  exports.createTeacherWithClasses =  async (req, res) => {
    const { name, subject, classes } = req.body;
  
    try {
      // Start a transaction to ensure data integrity
      const result = await sequelize.transaction(async (t) => {
        // Create the teacher
        const teacher = await Teacher.create(
          {
            name,
            subject,
            classes,  // This directly associates classes with the teacher
          },
          {
            include: [{ model: Class, as: 'classes' }],
            transaction: t
          }
        );
        
        return teacher;
      });
  
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating teacher with classes:', error);
      res.status(500).json({ error: 'Failed to create teacher with classes' });
    }
  };
  