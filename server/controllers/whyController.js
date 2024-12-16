const Why = require('../models/why');

const create = async (req, res) => {
  const { title, count } = req.body;
  try {
    const newData = await Why.create({
      title, count
    });
    res.status(201).json(newData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const getAll = async (req, res) => {
  try {
    const allData = await Why.findAll();
    res.status(200).json(allData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Why.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data', error });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, count } = req.body;

  try {
    const data = await Why.findByPk(id);
    
    if (!data) {
      return res.status(404).json({ message: "Record not found" });
    }
    
    if (title !== undefined) data.title = title;
    if (count !== undefined) data.console = count;
    
    await data.save();

    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedRows = await Why.destroy({
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

module.exports = { create, getAll, getById, update, deleteData };