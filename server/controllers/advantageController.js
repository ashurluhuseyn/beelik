const fs = require('fs')
const path = require('path');
const { Op } = require('sequelize');
const Advantage = require('../models/advantage');

const createData = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const newData = await Advantage.create({
      title,
      description,
      image 
    });

    res.status(201).json({ message: 'Data created successfully', data: newData });
  } catch (error) {
    console.error(error);

    if (req.file) {
        const filePath = path.join(__dirname, '..', 'uploads', 'advantages', req.file.filename);
        fs.unlink(filePath, (err) => {
          if (err) console.error(`Failed to delete file: ${filePath}`, err);
        });
      }

    res.status(500).json({ message: 'Error creating data', error });
  }
};

const getAllData = async (req, res) => {
  try {
    const data = await Advantage.findAll();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const getDataById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Advantage.findOne({ where: { id }});

    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : null;
    
        const data = await Advantage.findByPk(id);
    
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


const deleteData = async (req, res) => {
    try {
      const { id } = req.params;
  
      const dataToDelete = await Advantage.findByPk(id);
  
      if (!dataToDelete) {
        return res.status(404).json({ message: 'Data not found' });
      }
  
      const imagePath = path.join(__dirname, '..', 'uploads', 'advantages', dataToDelete.image);
  
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      await Advantage.destroy({ where: { id } });
  
      res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting data', error });
    }
};

module.exports = { createData, getAllData, getDataById, updateData, deleteData };