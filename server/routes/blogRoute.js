const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createBlog, deleteBlog, getAllBlogs, getBlogsByCategory, updateBlog, getBlogById, getBlogDetails } = require('../controllers/blogController');
const { authenticate, authorize } = require('../middlewares/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '..', 'uploads', 'blogs');
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

router.post('/', authenticate, authorize(['superAdmin', 'admin']), upload.single('image'), createBlog);
router.get('/', getAllBlogs);
router.get('/category/:categoryID', getBlogsByCategory);
router.get('/:id', getBlogById);
router.get('/:id/details', getBlogDetails);
router.patch('/:id', authenticate, authorize(['superAdmin', 'admin']),  updateBlog); 
router.delete('/:id', authenticate, authorize(['superAdmin']), deleteBlog);

module.exports = router;
