const express = require("express");
const router = express.Router();
const { create, getAll, getById, update, deleteData } = require('../controllers/whyController');
const { authenticate, authorize } = require("../middlewares/auth");

router.post('/',  authenticate, authorize(['superAdmin', 'admin']),  create);

router.get('/', getAll);

router.get('/:id', getById);

router.patch('/:id', authenticate, authorize(['superAdmin', 'admin']), update);

router.delete('/:id', authenticate, authorize(['superAdmin']), deleteData);

module.exports = router;