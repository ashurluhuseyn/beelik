const express = require("express");
const router = express.Router();
const { createVacancy, getAllVacancies, getVacancyById, updateVacancy, deleteVacancy, getVacancyDetails } = require('../controllers/vacancyController');
const { authenticate, authorize } = require("../middlewares/auth");

router.post('/', authenticate, authorize(['superAdmin', 'admin']),  createVacancy);

router.get('/', getAllVacancies);

router.get('/:id', getVacancyById);

router.get('/:id/details', getVacancyDetails);

router.patch('/:id', authenticate, authorize(['superAdmin', 'admin']), updateVacancy);

router.delete('/:id', authenticate, authorize(['superAdmin']), deleteVacancy);

module.exports = router;