const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  jobId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  applicantId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  tableName: 'Applications',
  timestamps: true,
});

module.exports = Application;
