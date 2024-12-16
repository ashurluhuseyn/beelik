const fs = require('fs')
const path = require('path');
const Home = require('../../models/Home/home');
const CorHome = require('../../models/Home/corHome');
const Course = require('../../models/course');
const Why = require('../../models/why');
const Advantage = require('../../models/advantage');
const Category = require('../../models/category');
const Partner = require('../../models/partner');

const createHomeData = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const newData = await Home.create({
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

const createCorHomeData = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newData = await CorHome.create({
      title,
      description
    });

    return res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the data.' });
  }
};

const getHomeData = async (req, res) => {
  try {
    const [home, partner,course, why] = await Promise.all([
      Home.findAll(),
      Partner.findAll(),
      Course.findAll({
        limit: 8,
        include: {
          model: Category, 
          as: 'category',
          attributes: ['title']
        }
      }),
      Why.findAll()
    ]);

    res.status(200).json({
      homeData: home[0],
      partnerData: partner,
      coursesData: course,
      whyData: why
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const getCorHomeData = async (req, res) => {
  try {
    const [course, advantage, corHome] = await Promise.all([
      Course.findAll({
        limit: 8,
        include: {
          model: Category, 
          as: 'category',
          attributes: ['title']
        }
      }),
      Advantage.findAll(),
      CorHome.findAll()
    ]);

    res.status(200).json({
      coursesData: course,
      advantageData: advantage,
      corHomeData: corHome[0]
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const getHomeDataById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Home.findByPk(id);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const getCorHomeDataById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await CorHome.findByPk(id);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const updateHomeData = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const image = req.file ? req.file.filename : null;
  
      const data = await Home.findByPk(id);
  
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

const updateCorHomeData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const data = await CorHome.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }

    await data.update({
      title: title !== undefined ? title : data.title,
      description: description !== undefined ? description : data.description,
    });

    res.status(200).json({ message: 'Data updated successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating data', error });
  }
};
  

module.exports = { createHomeData, createCorHomeData, getHomeData, getHomeDataById, getCorHomeDataById, getCorHomeData, updateHomeData, updateCorHomeData };