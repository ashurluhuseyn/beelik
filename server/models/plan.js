const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Course = require('./course');

const Plan = sequelize.define('Plan', {
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
  courseID: {
    type: DataTypes.INTEGER,
    references: {
      model: Course, 
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'plans',
  timestamps: false,
});

Plan.belongsTo(Course, { foreignKey: 'courseID', as: 'plan' });
Course.hasMany(Plan, { foreignKey: 'courseID' });


module.exports = Plan;
