const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { reateAlumni, getAllAlumni, getAlumniByCategory, getAlumniById, updateAlumni, deleteAlumni, createAlumni } = require('../controllers/alumniController');
const { authenticate, authorize } = require('../middlewares/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '..', 'uploads', 'alumni');
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

router.post('/', authenticate, authorize(['superAdmin', 'admin']), upload.single('image'), createAlumni);
router.get('/', getAllAlumni);
router.get('/category/:categoryID', getAlumniByCategory);
router.get('/:id', getAlumniById);
router.patch('/:id', authenticate, authorize(['superAdmin', 'admin']),  updateAlumni); 
router.delete('/:id', authenticate, authorize(['superAdmin']), deleteAlumni);

module.exports = router;
