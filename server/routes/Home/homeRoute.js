const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { authenticate, authorize } = require('../../middlewares/auth');
const { createHomeData, createCorHomeData, getHomeData, getCorHomeData, getCorHomeDataById, getHomeDataById, updateHomeData, updateCorHomeData } = require('../../controllers/Home/homeController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '..', 'uploads', 'home');
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

router.post('/', authenticate, authorize(['superAdmin', 'admin']), upload.single('image'), createHomeData);
router.post('/corporate', authenticate, authorize(['superAdmin', 'admin']),  createCorHomeData);
router.get('/', getHomeData);
router.get('/corporate', getCorHomeData);
router.get('/:id', getHomeDataById);
router.get('/:id/corporate', getCorHomeDataById);
router.patch('/:id', authenticate, authorize(['superAdmin', 'admin']),  updateHomeData); 
router.patch('/:id/corporate', authenticate, authorize(['superAdmin', 'admin']),  updateCorHomeData); 

module.exports = router;
