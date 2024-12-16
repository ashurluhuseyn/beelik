const express = require("express");
const router = express.Router();
const { createApply, getApplies, deleteApply, updateApplyStatus } = require('../../controllers/Apply/event');
const { authenticate, authorize } = require("../../middlewares/auth");

router.post('/', createApply);

router.get('/', getApplies);

router.put('/:id/status', authenticate, authorize(['superAdmin', 'admin']), updateApplyStatus);

router.delete('/:id', authenticate, authorize(['superAdmin']), deleteApply);

module.exports = router;