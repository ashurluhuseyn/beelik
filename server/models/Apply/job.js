const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const Vacancy = require('../vacancy');

const JobApply = sequelize.define('JobApply', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vacancyID: {
    type: DataTypes.INTEGER,
    references: {
      model: Vacancy, 
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'job_applies',
  timestamps: false,
});

JobApply.belongsTo(Vacancy, { foreignKey: 'vacancyID', as: 'vacancy' });
Vacancy.hasMany(JobApply, { foreignKey: 'vacancyID' });

module.exports = JobApply;
