const JobApply = require('../../models/Apply/job');
const Vacancy = require('../../models/vacancy');

const createApply = async (req, res) => {
  const { fullname, phone, email, vacancyID } = req.body;
  try {
    const existingApplication = await JobApply.findOne({
      where: { email }
    });

    if (existingApplication) {
      return res.status(400).json({ message: "Siz artıq müraciət etmisiniz" });
    }
   
    const newData = await JobApply.create({
      fullname,
      phone,
      email,
      vacancyID,
      cv: req.file.filename,
    });

    const vacancy = await Vacancy.findByPk(vacancyID);
    if (vacancy) {
      await vacancy.increment('applyCount');
    }

    res.status(201).json(newData);
  } catch (err) {
    console.error(err.message);
    if (req.file) {
      const filePath = path.join(__dirname, '..', '..', 'uploads', 'cvs', req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete file: ${filePath}`, err);
      });
    }
    res.status(500).send("Server Error");
  }
};

const getApplies = async (req, res) => {
  try {
    const allData = await JobApply.findAll();
    res.status(200).json(allData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const getAppliesByVacancyId = async (req, res) => {
  const { id } = req.params;
  
  try {
    const applications = await JobApply.findAll({
      where: { vacancyID: id },
      include: [
        {
          model: Vacancy,
          as: 'vacancy',
          attributes: ['title'],
        },
      ],
    });

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this vacancy.' });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateApplyStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const apply = await JobApply.findByPk(id);
  
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
  try {
    const { id } = req.params;

    const applyToDelete = await JobApply.findByPk(id);

    if (!applyToDelete) {
      return res.status(404).json({ message: 'Apply not found' });
    }

    const imagePath = path.join(__dirname, '..', '..', 'uploads', 'cvs', applyToDelete.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await JobApply.destroy({ where: { id } });

    res.status(200).json({ message: 'Apply deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting apply', error });
  }
};

module.exports = { createApply, getApplies, getAppliesByVacancyId, updateApplyStatus, deleteApply };