const EventApply = require('../../models/Apply/event');
const Event = require('../../models/event');

const createApply = async (req, res) => {
  const { fullname, phone, email, eventID } = req.body;
  try {
    const existingApplication = await EventApply.findOne({
      where: { email, eventID }
    });

    if (existingApplication) {
      return res.status(400).json({ message: "Siz artıq müraciət etmisiniz" });
    }

    const newData = await EventApply.create({
      fullname,
      phone,
      email,
      eventID
    });

    const event = await Event.findByPk(eventID);
    if (event) {
      event.applyCount = (event.applyCount || 0) + 1;
      await event.save();
    }

    res.status(201).json(newData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getApplies = async (req, res) => {
  try {
    const allData = await EventApply.findAll();
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
      const apply = await EventApply.findByPk(id);
  
      if (!apply) {
        return res.status(404).json({ message: 'Müraciət tapılmadı' });
      }
  
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
    const deletedRows = await EventApply.destroy({
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