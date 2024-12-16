const fs = require('fs')
const path = require('path');
const Course = require('../models/course');
const Category = require('../models/category');
const Plan = require('../models/plan');
const Teacher = require('../models/teacher');
const { Op } = require('sequelize');

const createCourse = async (req, res) => {
  try {
    const { title, description, month, hours, taskCount, categoryID } = req.body;
    const image = req.file ? req.file.filename : null;

    const newData = await Course.create({
      title,
      description,
      month,
      hours,
      taskCount,
      categoryID,
      image
    });

    return res.status(201).json(newData);
  } catch (error) {
    console.error(error);

    if (req.file) {
      const filePath = path.join(__dirname, '..', 'uploads', 'courses', req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file: ${filePath}`, err);
      });
    }

    return res.status(500).json({ error: 'An error occurred while creating the data.' });
  }
};

const getCourses = async (req, res) => {
  try {
    const data = await Course.findAll({
        include: {
          model: Category,
          as: 'category',
          attributes: ['title'],
        },
      });

    res.status(200).json(data);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Course.findByPk(id);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const getCoursesByCategory = async (req, res) => {
  try {
    const { categoryID } = req.params;

    const courses = await Course.findAll({
      where: { categoryID },
      include: [
        {
          model: Category,
          as: 'category', 
          attributes: ['id', 'title'],
        },
      ],
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving courses by category', error });
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const [course, teachingPlans] = await Promise.all([
      Course.findByPk(id),
      Plan.findAll({
        where: {
          courseID: id,
        },
      }),
    ]);

    const teachers = await Teacher.findAll({
      where: {
        courseIDs: {
          [Op.contains]: [parseInt(id)], 
        },
      },
    });

    if (course) {
      await course.increment('viewCount', { by: 1 });
    } else {
      return res.status(404).json({ message: 'Kurs tapılmadı' });
    }

    res.status(200).json({
      courseData: course,
      teachingPlans: teachingPlans,
      teachers: teachers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Məlumat gətirilməsində xəta baş verdi', error });
  }
};

const updateCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, month, hours, taskCount, categoryID } = req.body;
      const image = req.file ? req.file.filename : null;
  
      const data = await Course.findByPk(id);
  
      if (!data) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      await data.update({
        title: title !== undefined ? title : data.title,
        description: description !== undefined ? description : data.description,
        month: month !== undefined ? month : data.month,
        hours: hours !== undefined ? hours : data.hours,
        taskCount: taskCount !== undefined ? taskCount : data.taskCount,
        categoryID: categoryID !== undefined ? categoryID : data.categoryID,
        image: image !== null ? image : data.image,
      });


      res.status(200).json({ message: 'Data updated successfully', data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating data', error });
    }
};  


const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const courseToDelete = await Course.findByPk(id);

    if (!courseToDelete) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const imagePath = path.join(__dirname, '..', 'uploads', 'courses', courseToDelete.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Course.destroy({ where: { id } });

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting course', error });
  }
};


module.exports = { createCourse, getCourses, getCourseById, getCourseDetails, getCoursesByCategory, updateCourse, deleteCourse };