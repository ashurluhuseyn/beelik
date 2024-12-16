const http = require('http'); 
const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const { sequelize } = require('./config/db');

const PORT = process.env.PORT || 4000;
const whyRoutes = require('./routes/whyRoute');
const statRoutes = require('./routes/statRoute');
const authRoutes = require('./routes/authRoute');
const planRoutes = require('./routes/planRoute');
const homeRoutes = require('./routes/Home/homeRoute');
const blogRoutes = require('./routes/blogRoute');
const aboutRoutes = require('./routes/aboutRoute');
const eventRoutes = require('./routes/eventRoute');
const alumniRoutes = require('./routes/alumniRoute');
const courseRoutes = require('./routes/courseRoute');
const contactRoutes = require('./routes/contactRoute');
const vacancyRoutes = require('./routes/vacancyRoute');
const partnerRoutes = require('./routes/partnerRoute');
const teacherRoutes = require('./routes/teacherRoute');
const categoryRoutes = require('./routes/categoryRoute');
const advantageRoutes = require('./routes/advantageRoute');
const eventApplyRoutes = require('./routes/Apply/event');
const jobApplyRoutes = require('./routes/Apply/job');
const academicApplyRoutes = require('./routes/Apply/academic');
const corporateApplyRoutes = require('./routes/Apply/corporate');

const {createSuperUser} = require('./controllers/superUserController'); 
createSuperUser()


// DB connection
const { testConnection } = require('./config/db');
const { saveVisitorLog } = require('./middlewares/saveVisitorLog');
testConnection();

// middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true })); 
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(saveVisitorLog)


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/v1/why", whyRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/plan", planRoutes);
app.use("/api/v1/stat", statRoutes);
app.use("/api/v1/home", homeRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/about", aboutRoutes);
app.use("/api/v1/alumni", alumniRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/partner", partnerRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/vacancy", vacancyRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/advantage", advantageRoutes);
app.use("/api/v1/apply/event", eventApplyRoutes);
app.use("/api/v1/apply/job", jobApplyRoutes);
app.use("/api/v1/apply/academic", academicApplyRoutes);
app.use("/api/v1/apply/corporate", corporateApplyRoutes);


sequelize.sync({ force: false, alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Failed to synchronize database:', err.message);
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});