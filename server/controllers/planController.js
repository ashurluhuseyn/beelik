const Plan = require('../models/plan');

const createPlan = async (req, res) => {
  const { title, description, courseID } = req.body;
  try {
    const newPlan = await Plan.create({
      title,
      description,
      courseID
    });
    res.status(201).json(newPlan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const getPlans = async (req, res) => {
  try {
    const allPlans = await Plan.findAll();
    res.status(200).json(allPlans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving plan', error });
  }
};

const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { title, description, courseID } = req.body;

  try {
    const plan = await Plan.findByPk(id);
    
    if (!plan) {
      return res.status(404).json({ message: "Record not found" });
    }
    
    if (title !== undefined) plan.title = title;
    if (description !== undefined) plan.description = description;
    if (courseID !== undefined) plan.courseID = courseID;
    
    await plan.save();

    res.status(200).json(plan);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const deletePlan = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedRows = await Plan.destroy({
      where: { id }
    });
    
    if (deletedRows === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { createPlan, getPlanById, getPlans, updatePlan, deletePlan };