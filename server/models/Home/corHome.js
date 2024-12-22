const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const CorHome = sequelize.define('CorHome', {
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
  }
}, {
  tableName: 'corporate_home',
  timestamps: false,
});

module.exports = CorHome;
