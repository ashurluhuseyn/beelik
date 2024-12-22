const fs = require('fs')
const path = require('path');
const About = require('../models/about');
const Vacancy = require('../models/vacancy');
const Why = require('../models/why');

const createAbout = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const newData = await About.create({
      title,
      description,
      image
    });

    return res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the data.' });
  }
};

const getAbout = async (req, res) => {
  try {
    const [about, vacancy, why] = await Promise.all([About.findAll(), Vacancy.findAll(), Why.findAll()])

    res.status(200).json({
      aboutData: about[0],
      vacancyData: vacancy,
      whyData: why
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const getAboutById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await About.findByPk(id);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const updateAbout = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const image = req.file ? req.file.filename : null;
  
      const data = await About.findByPk(id);
  
      if (!data) {
        return res.status(404).json({ message: 'Data not found' });
      }
  
      await data.update({
        title: title !== undefined ? title : data.title,
        description: description !== undefined ? description : data.description,
        image: image !== null ? image : data.image,
      });
  
      res.status(200).json({ message: 'Data updated successfully', data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating data', error });
    }
  };
  

module.exports = { createAbout, getAbout, getAboutById, updateAbout };