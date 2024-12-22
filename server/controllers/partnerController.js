const fs = require('fs')
const path = require('path');
const Partner = require('../models/partner');

const createPartner = async (req, res) => {
  try {
    const { link } = req.body;
    const image = req.file ? req.file.filename : null;

    const newData = await Partner.create({
      image, 
      link
    });

    res.status(201).json({ message: 'Data created successfully', data: newData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating data', error });
  }
};

const getAllPartners = async (req, res) => {
  try {
    const data = await Partner.findAll();

    res.status(200).json( data );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const getPartnerById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Partner.findOne({ where: { id } });

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const { link } = req.body;
    const image = req.file ? req.file.filename : null;

    const dataToUpdate = await Partner.findByPk(id);

    if (image && dataToUpdate.image) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', 'partners', dataToUpdate.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedData = {
      link: link || dataToUpdate.link,
      image: image || dataToUpdate.image,
    };

    await Partner.update(updatedData, { where: { id } });

    const updatedPartner = await Partner.findOne({ where: { id } });

    res.status(200).json({ message: 'Data updated successfully', data: updatedPartner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating data', error });
  }
};

const deletePartner = async (req, res) => {
    try {
      const { id } = req.params;
  
      const dataToDelete = await Partner.findByPk(id);
  
      const imagePath = path.join(__dirname, '..', 'uploads', 'partners', dataToDelete.image);
  
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      await Partner.destroy({ where: { id } });
  
      res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting data', error });
    }
};

module.exports = { createPartner, getAllPartners, getPartnerById, updatePartner, deletePartner };