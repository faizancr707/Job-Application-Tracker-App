const User = require('./user');
const Company = require('./company');
const Job = require('./job');
const Application = require('./application');

// Define associations after models are loaded

// Company <-- User
Company.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Company, { foreignKey: 'userId', as: 'companies' });

// Job <-- Company, Job <-- User (creator)
Job.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
Job.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
Company.hasMany(Job, { foreignKey: 'companyId', as: 'jobs' });
User.hasMany(Job, { foreignKey: 'createdBy', as: 'createdJobs' });

// Application <-- User, Application <-- Job
Application.belongsTo(User, { foreignKey: 'applicantId', as: 'applicant' });
User.hasMany(Application, { foreignKey: 'applicantId' });

Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });
Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' });

module.exports = { User, Company, Job, Application };
