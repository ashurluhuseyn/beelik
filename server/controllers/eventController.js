const fs = require('fs')
const path = require('path');
const Event = require('../models/event');

const createEvent = async (req, res) => {
  try {
    const { title, description, location, date } = req.body;
    const image = req.file ? req.file.filename : null;

    const newData = await Event.create({
      title,
      description,
      location,
      date,
      image
    });

    return res.status(201).json(newData);
  } catch (error) {
    console.error(error);

    if (req.file) {
      const filePath = path.join(__dirname, '..', 'uploads', 'events', req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file: ${filePath}`, err);
      });
    }

    return res.status(500).json({ error: 'An error occurred while creating the data.' });
  }
};

const getEvents = async (req, res) => {
  try {
    const data = await Event.findAll();

    res.status(200).json(data);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Event.findByPk(id);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const updateEvent = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, location, date } = req.body;
      const image = req.file ? req.file.filename : null;
  
      const data = await Event.findByPk(id);
  
      if (!data) {
        return res.status(404).json({ message: 'Event not found' });
      }

      await data.update({
        title: title !== undefined ? title : data.title,
        description: description !== undefined ? description : data.description,
        location: location !== undefined ? location : data.location,
        date: date !== undefined ? date : data.date,
        image: image !== null ? image : data.image,
      });

  
      res.status(200).json({ message: 'Data updated successfully', data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating data', error });
    }
};  

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedRows = await Event.destroy({
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


module.exports = { createEvent, getEvents, getEventById, updateEvent, deleteEvent };