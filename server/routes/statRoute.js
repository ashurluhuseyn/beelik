const express = require("express");
const router = express.Router();
const { getApplyCounts, getCourseViews, getHourlyVisits } = require('../controllers/statController')

router.get('/apply-counts', getApplyCounts)
router.get('/course/views', getCourseViews)
router.get('/visits', getHourlyVisits)

module.exports = router;