const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../utils/db');

class Job extends Model {}

Job.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  requirements: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  salary: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  experienceLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Job',
  tableName: 'Jobs',
  timestamps: true,
});

module.exports = Job;
