const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const Event = require('../event');

const EventApply = sequelize.define('EventApply', {
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
  eventID: {
    type: DataTypes.INTEGER,
    references: {
      model: Event, 
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'event_applies',
  timestamps: false,
});


module.exports = EventApply;
