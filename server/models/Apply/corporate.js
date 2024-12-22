const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const CorporateApply = sequelize.define('CorporateApply', {
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
}, {
  tableName: 'corporate_applies',
  timestamps: false,
});

module.exports = CorporateApply;
