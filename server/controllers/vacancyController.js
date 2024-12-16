const { Op } = require('sequelize');
const Vacancy = require('../models/vacancy');

const createVacancy = async (req, res) => {
  try {
    const { title, description, jobType, requirements, deadline } = req.body;

    const newVacancy = await Vacancy.create({
      title,
      description,
      jobType,
      requirements,
      deadline,
    });

    res.status(201).json({ message: 'Vacancy created successfully', data: newVacancy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating vacancy', error });
  }
};

const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.findAll();

    res.status(200).json(vacancies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving vacancies', error });
  }
};

const getVacancyById = async (req, res) => {
  try {
    const { id } = req.params;

    const vacancy = await Vacancy.findByPk(id);

    res.status(200).json(vacancy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving vacancy', error });
  }
};

const getVacancyDetails = async (req, res) => {
    try {
      const { id } = req.params;
  
      await Vacancy.increment('viewCount', { where: { id } });

      const [vacancy, otherVacancies] = await Promise.all([
        Vacancy.findByPk(id),
        Vacancy.findAll({
          where: {
            id: {
              [Op.ne]: id 
            }
          },
          limit: 4
        })
      ]);
  
      res.status(200).json({
        vacancyData: vacancy,
        otherVacancies: otherVacancies
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving vacancy', error });
    }
};
  

const updateVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, jobType, requirements, deadline } = req.body;

    const vacancy = await Vacancy.findByPk(id);

    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }

    await vacancy.update({
        title: title !== undefined ? title : vacancy.title,
        description: description !== undefined ? description : vacancy.description,
        jobType: jobType !== undefined ? jobType : vacancy.jobType,
        requirements: requirements !== undefined ? requirements : vacancy.requirements,
        deadline: deadline !== undefined ? deadline : vacancy.deadline,
    });

    res.status(200).json({ message: 'Vacancy updated successfully', data: vacancy });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating vacancy', error });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    const { id } = req.params;

    const vacancy = await Vacancy.findByPk(id);

    await vacancy.destroy();

    res.status(200).json({ message: 'Vacancy deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting vacancy', error });
  }
};

module.exports = {
  createVacancy,
  getAllVacancies,
  getVacancyById,
  getVacancyDetails,
  updateVacancy,
  deleteVacancy,
};
