const express = require("express");
const router = express.Router();
const { createApply, getApplies, updateApplyStatus, deleteApply } = require('../../controllers/Apply/academic');
const { authenticate, authorize } = require("../../middlewares/auth");

router.post('/', createApply);

router.get('/', getApplies);

router.patch('/:id/status', authenticate, authorize(['superAdmin', 'admin']), updateApplyStatus);

router.delete('/:id', authenticate, authorize(['superAdmin']), deleteApply);

module.exports = router;