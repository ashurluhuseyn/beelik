const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const Course = require('../course');

const AcademicApply = sequelize.define('AcademicApply', {
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
  status: {
    type: DataTypes.ENUM,
    values: ['gözləmədə', 'təsdiqlənmiş', 'silinmiş'],
    defaultValue: 'gözləmədə',
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  courseID: {
    type: DataTypes.INTEGER,
    references: {
      model: Course, 
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'academic_applies',
  timestamps: false,
});

AcademicApply.belongsTo(Course, { foreignKey: 'courseID', as: 'course' });
Course.hasMany(AcademicApply, { foreignKey: 'courseID' });

module.exports = AcademicApply;
