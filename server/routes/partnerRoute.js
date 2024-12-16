const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createPartner, getAllPartners, getPartnerById, updatePartner, deletePartner } = require('../controllers/partnerController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '..', 'uploads', 'partners');
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
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only images are allowed'), false);
      }
      cb(null, true);
    }
  });

router.post('/', upload.single('image'), createPartner);
router.get('/', getAllPartners);
router.get('/:id', getPartnerById);
router.patch('/:id', updatePartner); 
router.delete('/:id', deletePartner);

module.exports = router;
