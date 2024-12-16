const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Why = sequelize.define('Why', {
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
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'why',
  timestamps: false,
});


module.exports = Why;
