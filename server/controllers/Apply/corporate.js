const CorporateApply = require('../../models/Apply/corporate');

const createApply = async (req, res) => {
  const { fullname, phone, email, description } = req.body;
  try {
    const existingApplication = await CorporateApply.findOne({
      where: { email }
    });

    if (existingApplication) {
      return res.status(400).json({ message: "Siz artıq müraciət etmisiniz" });
    }

    const newData = await CorporateApply.create({
      fullname,
      phone,
      email,
      description
    });

    res.status(201).json(newData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getApplies = async (req, res) => {
  try {
    const allData = await CorporateApply.findAll();
    res.status(200).json(allData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const updateApplyStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const apply = await CorporateApply.findByPk(id);
  
      apply.status = status;
      await apply.save();
  
      res.json({
        message: 'Status uğurla yeniləndi',
        apply
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Status yenilənərkən səhv baş verdi' });
    }
  };

const deleteApply = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedRows = await CorporateApply.destroy({
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

module.exports = { createApply, getApplies, updateApplyStatus, deleteApply };