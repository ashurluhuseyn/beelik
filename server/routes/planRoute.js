const express = require("express");
const router = express.Router();
const { createPlan, getPlans, getPlanById, updatePlan, deletePlan } = require('../controllers/planController');
const { authenticate, authorize } = require("../middlewares/auth");

router.post('/', authenticate, authorize(['superAdmin', 'admin']), createPlan);

router.get('/', getPlans);

router.get('/:id', getPlanById);

router.patch('/:id', authenticate, authorize(['superAdmin', 'admin']), updatePlan);

router.delete('/:id', authenticate, authorize(['superAdmin']), deletePlan);

module.exports = router;