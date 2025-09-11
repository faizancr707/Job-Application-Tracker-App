const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  website: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  logo: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  tableName: 'Companies',
});

module.exports = Company;

