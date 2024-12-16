const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Home = sequelize.define('Home', {
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
  tableName: 'home',
  timestamps: false,
});

module.exports = Home;
