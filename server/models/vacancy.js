// models/vacancy.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Vacancy = sequelize.define('Vacancy', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  jobType: {
    type: DataTypes.ENUM('full-time', 'part-time', 'intern', 'remote'),
    allowNull: false,
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  applyCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  tableName: 'vacancies',
  timestamps: false,
});

module.exports = Vacancy;
