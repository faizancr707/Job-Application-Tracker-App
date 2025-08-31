
const Company = require('../models/company.js');

const { Job, Application, User } = require('../models/assosiations');
/**
 * Apply to a specific job
 */
const applyJob = async (req, res) => {
  try {
    const userId = req.id; // set by auth middleware
    const jobId = req.params.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Please log in.'
      });
    }

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: 'Job ID is required.'
      });
    }

    // Check if job exists
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found.'
      });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      where: {
        jobId,
        applicantId: userId
      }
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job.'
      });
    }

    // Create application
    const newApplication = await Application.create({
      jobId,
      applicantId: userId,
      status: 'pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Job applied successfully.',
      application: newApplication
    });
  } catch (error) {
    console.error('applyJob error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while applying to the job.'
    });
  }
};

/**
 * Get all jobs applied by authenticated user
 */
const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Please log in.'
      });
    }

    const applications = await Application.findAll({
      where: { applicantId: userId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Job,
          as: 'job',
          include: [
            {
              model: Company,
              as: 'company'
            }
          ]
        }
      ]
    });

    return res.status(200).json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('getAppliedJobs error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching applied jobs.'
    });
  }
};

/**
 * Get all applicants for a specific job (for employers)
 */
const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.applicationId;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: 'Job ID is required.'
      });
    }

    const job = await Job.findByPk(jobId, {
      include: [
        {
          model: Application,
          as: 'applications',
          include: [
            {
              model: User,
              as: 'applicant',
              attributes: ['id', 'name', 'email']
            }
          ]
        }
      ],
      order: [
        [{ model: Application, as: 'applications' }, 'createdAt', 'DESC']
      ]
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found.'
      });
    }

    return res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    console.error('getApplicants error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching applicants.'
    });
  }
};

/**
 * Update application status (for employers/admin)
 */
const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required.'
      });
    }

    const allowedStatuses = ['pending', 'accepted', 'rejected'];
    if (!allowedStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowedStatuses.join(', ')}`
      });
    }

    const application = await Application.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found.'
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      success: true,
      message: 'Status updated successfully.',
      application
    });
  } catch (error) {
    console.error('updateStatus error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating application status.'
    });
  }
};

/**
 * ✅ NEW: Get single job with applications & company info
 * This is what your frontend JobDescription.jsx needs
 */
const getSingleJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findByPk(jobId, {
      include: [
        {
          model: Company,
          as: 'company'
        },
        {
          model: Application,
          as: 'applications',
          include: [
            {
              model: User,
              as: 'applicant',
              attributes: ['id', 'name', 'email']
            }
          ]
        }
      ],
      order: [
        [{ model: Application, as: 'applications' }, 'createdAt', 'DESC']
      ]
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found.'
      });
    }

    return res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    console.error('getSingleJob error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching job details.'
    });
  }
};

module.exports = {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
  getSingleJob
};
