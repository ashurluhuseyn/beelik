const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const About = sequelize.define('About', {
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
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'about',
  timestamps: false,
});

module.exports = About;
