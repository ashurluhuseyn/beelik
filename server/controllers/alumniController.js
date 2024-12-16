const fs = require('fs')
const path = require('path');
const Alumni = require('../models/alumni');
const Category = require('../models/category');
const { Op } = require('sequelize');

const createAlumni = async (req, res) => {
  try {
    const { fullname, description, workPlace, position, categoryID } = req.body;
    const image = req.file ? req.file.filename : null;

    const newData = await Alumni.create({
      fullname,
      description,
      workPlace,
      position,
      image, 
      categoryID
    });

    res.status(201).json({ message: 'Data created successfully', data: newData });
  } catch (error) {
    console.error(error);

    if (req.file) {
      const filePath = path.join(__dirname, '..', 'uploads', 'alumni', req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file: ${filePath}`, err);
      });
    }

    res.status(500).json({ message: 'Error creating data', error });
  }
};

const getAllAlumni = async (req, res) => {
  try {
    const data = await Alumni.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const getAlumniById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Alumni.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const getAlumniByCategory = async (req, res) => {
  try {
    const { categoryID } = req.params;

    const data = await Alumni.findAll({
      where: { categoryID },
      include: [
        {
          model: Category,
          as: 'category', 
          attributes: ['id', 'title'],
        },
      ],
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data by category', error });
  }
};

const updateAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, description, categoryID, workPlace, position } = req.body;
    const image = req.file ? req.file.filename : null;

    const dataToUpdate = await Alumni.findByPk(id);

    if (image && dataToUpdate.image) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', 'alumni', dataToUpdate.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedData = {
      fullname: fullname || dataToUpdate.fullname,
      description: description || dataToUpdate.description,
      image: image || dataToUpdate.image,
      categoryID: categoryID || dataToUpdate.categoryID,
      workPlace: workPlace || dataToUpdate.workPlace,
      position: position || dataToUpdate.position,
      updateDate: new Date()
    };

    const updatedAlumni = await Alumni.update(updatedData, { where: { id } });

    const alumni = await Alumni.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    if (updatedAlumni[0] === 1) {  
      return res.status(200).json({ message: 'Data updated successfully', data: alumni });
    } else {
      return res.status(400).json({ message: 'Data update failed, no changes made' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating data', error });
  }
};

const deleteAlumni = async (req, res) => {
    try {
      const { id } = req.params;
  
      const dataToDelete = await Alumni.findByPk(id);
  
      const imagePath = path.join(__dirname, '..', 'uploads', 'alumni', dataToDelete.image);
  
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      await Alumni.destroy({ where: { id } });
  
      res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting data', error });
    }
};

module.exports = { createAlumni, getAllAlumni, getAlumniByCategory, getAlumniById, updateAlumni, deleteAlumni };