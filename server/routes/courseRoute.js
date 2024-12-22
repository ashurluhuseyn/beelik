const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createCourse, getCourses, getCourseById, getCoursesByCategory, updateCourse, deleteCourse, getCourseDetails  } = require('../controllers/courseController');
const { authenticate, authorize } = require('../middlewares/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '..', 'uploads', 'courses');
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExt = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + fileExt);
    }
  });

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only images are allowed'), false);
      }
      cb(null, true);
    }
  });

router.post('/', authenticate, authorize(['superAdmin', 'admin']), upload.single('image'), createCourse);
router.get('/', getCourses);
router.get('/category/:categoryID', getCoursesByCategory);
router.get('/:id', getCourseById);
router.get('/:id/details', getCourseDetails);
router.patch('/:id', authenticate, authorize(['superAdmin', 'admin']),  updateCourse); 
router.delete('/:id', authenticate, authorize(['superAdmin']), deleteCourse);

module.exports = router;
