const { DataTypes, Sequelize, Op } = require('sequelize');
const { sequelize } = require('../config/db'); // Ensure this path is correct

const VisitorLog = sequelize.define('VisitorLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = VisitorLog;