const express = require("express");
const router = express.Router();
const { createData, getData, getDataById, updateData, deleteData } = require('../controllers/contactController');
const { authenticate, authorize } = require("../middlewares/auth");

router.post('/', authenticate, authorize(['superAdmin', 'admin']), createData);

router.get('/', getData);

router.get('/:id', getDataById);

router.patch('/:id', authenticate, authorize(['superAdmin', 'admin']), updateData);

router.delete('/:id', authenticate, authorize(['superAdmin']), deleteData);

module.exports = router;