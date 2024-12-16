const Contact = require('../models/contact');

const createData = async (req, res) => {
  const { address, addressExplain, phone1, phone2, email, linkedin, facebook, instagram } = req.body;
  try {
    const newData = await Contact.create({
        address, 
        addressExplain, 
        phone1, 
        phone2, 
        email, 
        linkedin, 
        facebook, 
        instagram
    });
    res.status(201).json(newData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const getData = async (req, res) => {
  try {
    const allData = await Contact.findAll();
    res.status(200).json(allData[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const getDataById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Contact.findByPk(id);

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
  const { id } = req.params;
  
  try {
      const { id } = req.params;
      const { address, addressExplain, phone1, phone2, email, linkedin, facebook, instagram } = req.body;
  
      const data = await Contact.findByPk(id);
  
      if (!data) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      await data.update({
        address: address || data.address,
        addressExplain: addressExplain || data.addressExplain,
        phone1: phone1 || data.phone1,
        phone2: phone2 || data.phone2,
        email: email || data.email,
        linkedin: linkedin || data.linkedin,
        facebook: facebook || data.facebook,
        instagram: instagram || data.instagram,
      });
  
      res.status(200).json({ message: 'Data updated successfully', data });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedRows = await Contact.destroy({
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

module.exports = { createData, getData, getDataById, updateData, deleteData };