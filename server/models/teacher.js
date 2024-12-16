const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./category');

const Teacher = sequelize.define(
  'Teacher',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryID: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: 'id',
      },
      allowNull: false,
    },
    courseIDs: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    tableName: 'teachers',
    timestamps: false,
  }
);

// Əlaqələr
Teacher.belongsTo(Category, { foreignKey: 'categoryID', as: 'category' });
Category.hasMany(Teacher, { foreignKey: 'categoryID', as: 'teachers' });

module.exports = Teacher;
