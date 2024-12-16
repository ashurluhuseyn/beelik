const path = require('path');
const fs = require('fs');
const Teacher = require('../models/teacher');
const Course = require('../models/course');
const Category = require('../models/category');

const createTeacher = async (req, res) => {
  try {
    const { name, bio, experience, categoryID, courseIDs } = req.body;
    const image = req.file ? req.file.filename : null;

    const parsedCourseIDs = courseIDs ? JSON.parse(courseIDs) : [];

    const newTeacher = await Teacher.create({
      name,
      bio,
      experience,
      categoryID,
      image,
      courseIDs: parsedCourseIDs,
    });

    res.status(201).json({ message: 'Teacher uğurla əlavə edildi', data: newTeacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Teacher əlavə olunarkən xəta baş verdi', error });
  }
};


const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving teachers', error });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving teacher', error });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacherToDelete = await Teacher.findByPk(id);

    if (!teacherToDelete) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const imagePath = path.join(__dirname, '..', 'uploads', 'teachers', teacherToDelete.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Teacher.destroy({ where: { id } });

    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting teacher', error });
  }
};

module.exports = { createTeacher, getTeachers, getTeacherById, deleteTeacher };
