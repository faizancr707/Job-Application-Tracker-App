const { Op } = require('sequelize');
const { Job, Company, Application } = require('../models/assosiations'); // Prefer importing from central associations file

// POST /api/v1/job — Admin creates a job
const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      requirements === undefined ||
      !salary ||
      !location ||
      !jobType ||
      experience === undefined ||
      position === undefined ||
      !companyId
    ) {
      return res.status(400).json({ message: "All fields are required.", success: false });
    }

    const company = await Company.findOne({ where: { id: companyId, userId } });
    if (!company) {
      return res.status(404).json({ message: "Company not found or not authorized.", success: false });
    }

    let reqs = [];
    if (Array.isArray(requirements)) {
      reqs = requirements;
    } else if (typeof requirements === 'string') {
      reqs = requirements.split(',').map(r => r.trim()).filter(Boolean);
    }

    const experienceLevel = isNaN(Number(experience)) ? 0 : Number(experience);
    const parsedSalary = Number(salary);
    const parsedPosition = Number(position);

    const job = await Job.create({
      title,
      description,
      requirements: reqs,
      salary: parsedSalary,
      location,
      jobType,
      experienceLevel,
      position: parsedPosition,
      companyId,
      createdBy: userId,
    });

    return res.status(201).json({ message: "New job created successfully.", job, success: true });
  } catch (error) {
    console.error("Error posting job:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// GET /api/v1/job — fetch all jobs with optional keyword filtering
const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const where = keyword
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${keyword}%` } },
            { description: { [Op.like]: `%${keyword}%` } }
          ]
        }
      : undefined;

    const jobs = await Job.findAll({
      where,  // Apply keyword filtering here
      include: [
        { model: Company, as: 'company' },
        { model: Application, as: 'applications' }
      ]
    });

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET /api/v1/job/:id — fetch single job by ID
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: "Job ID required.", success: false });
    }

    const job = await Job.findByPk(jobId, {
      include: [
        { model: Application, as: 'applications' },
        { model: Company, as: 'company' }
      ]
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found.", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET /api/v1/job/admin — fetch jobs created by this admin
const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.findAll({
      where: { createdBy: adminId },
      include: [{ model: Company, as: 'company' }],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Error fetching admin jobs:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// DELETE /api/v1/job/:id
const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: 'Job ID is required', success: false });
    }

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found', success: false });
    }

    if (job.createdBy !== req.id) {
      return res.status(403).json({ message: 'Not authorized to delete this job', success: false });
    }

    await job.destroy();

    const remainingJobs = await Job.findAll();

    return res.status(200).json({ message: 'Job deleted successfully', remainingJobs, success: true });
  } catch (error) {
    console.error('Error deleting job:', error);
    return res.status(500).json({ message: 'Error deleting the job', error: error.message, success: false });
  }
};

module.exports = {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  deleteJob
};
