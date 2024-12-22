// const JobApply = require('../models/ApplyModel/jobApply');
const AcademicApply = require('../models/Apply/academic');
const CorporateApply = require('../models/Apply/corporate');
const Blog = require('../models/blog');
const User = require('../models/auth');
const Vacancy = require('../models/vacancy');
const Course = require('../models/course');
const VisitorLog = require('../models/visitorLog');
const { Op } = require('sequelize');
const { sequelize } = require('../config/db');



const getApplyCounts = async (req, res) => {
    try {
        const [
            academicApplyCount,
            corporateApplyCount,
            blogCount,
            userCount,
            vacancyCount,
            courseCount
        ] = await Promise.all([
            AcademicApply.count(),
            CorporateApply.count(),
            Blog.count(),
            User.count(),
            Vacancy.count(),
            Course.count()
        ]);

        res.json({
            academicApply: academicApplyCount,
            corporateApply: corporateApplyCount,
            blogCount: blogCount,
            userCount: userCount,
            vacancyCount: vacancyCount,
            courseCount: courseCount
        });
    } catch (error) {
        console.error('Error fetching counts:', error);
        res.status(500).send('Server error');
    }
};

const getCourseViews = async (req, res) => {
    try {
    const courses = await Course.findAll();
    const courseViews = courses.map(course => ({
        name: course.title,
        views: course.viewCount
    }));

    res.json(courseViews);
    } catch (error) {
    console.error('Kursların baxış sayı alınarkən xəta:', error);
    res.status(500).send('Server xəta baş verdi');
    }
};

const getHourlyVisits = async (req, res) => {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
  
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
  
      const visits = await VisitorLog.findAll({
        where: {
          timestamp: {
            [Op.between]: [startOfDay, endOfDay],
          },
        },
        attributes: [
          [sequelize.literal('EXTRACT(HOUR FROM "timestamp")'), 'hour'], // Correct PostgreSQL syntax
          [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        ],
        group: [sequelize.literal('EXTRACT(HOUR FROM "timestamp")')],
        order: [[sequelize.literal('EXTRACT(HOUR FROM "timestamp")'), 'ASC']],
      });
  
      res.json(visits);
    } catch (error) {
      console.error('Saatlıq girişlər alınarkən xəta:', error);
      res.status(500).send('Serverdə xəta baş verdi');
    }
  };

module.exports = {getApplyCounts, getCourseViews, getHourlyVisits}