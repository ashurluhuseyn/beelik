const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./category');

const Alumni = sequelize.define('Alumni', {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  workPlace: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryID: {
    type: DataTypes.INTEGER,
    references: {
      model: Category, 
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'alumni',
  timestamps: false,
});

Alumni.belongsTo(Category, { foreignKey: 'categoryID', as: 'category' });
Category.hasMany(Alumni, { foreignKey: 'categoryID' });


module.exports = Alumni;
