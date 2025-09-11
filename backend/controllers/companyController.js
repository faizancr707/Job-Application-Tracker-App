const Company = require("../models/company");
const User = require("../models/user");
const uploadFileToS3 = require("../utils/uploadFileToS3");

// Register a new company
exports.registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    console.log("User ID in request (req.id):", req.id);
    const user = await User.findByPk(req.id);
    if (!user) {
      return res.status(400).json({
        message: "User does not exist.",
        success: false,
      });
    }

    const existingCompany = await Company.findOne({
      where: { name: companyName, userId: req.id },
    });

    if (existingCompany) {
      return res.status(400).json({
        message: "You can't register the same company again.",
        success: false,
      });
    }

    const company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while registering company.",
      success: false,
    });
  }
};

// Get all companies for the logged-in user
exports.getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.findAll({ where: { userId } });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found.",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while fetching companies.",
      success: false,
    });
  }
};

// Get a company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    if (!companyId || isNaN(Number(companyId))) {
      return res.status(400).json({
        message: "Valid company ID is required.",
        success: false,
      });
    }

    const company = await Company.findOne({
      where: { id: Number(companyId) },
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while fetching company.",
      success: false,
    });
  }
};

// Update company details (only owner allowed)
exports.updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const userId = req.id;
    const { name, description, website, location } = req.body;

    if (!companyId || isNaN(Number(companyId))) {
      return res.status(400).json({
        message: "Valid company ID is required.",
        success: false,
      });
    }

    const updateData = {
      name,
      description,
      website,
      location,
    };

    if (req.file) {
      const fileBuffer = req.file.buffer;
      const fileName = `${Date.now()}_${req.file.originalname}`;
      const fileUrl = await uploadFileToS3(fileBuffer, fileName, req.file.mimetype);
      updateData.logo = fileUrl;
    }

    // Ensure only the company owner can update
    const [updatedCount] = await Company.update(updateData, {
      where: { id: Number(companyId), userId },
    });

    if (updatedCount === 0) {
      return res.status(404).json({
        message: "Company not found or you are not authorized to update it.",
        success: false,
      });
    }

    const updatedCompany = await Company.findOne({ where: { id: Number(companyId) } });

    return res.status(200).json({
      message: "Company updated successfully.",
      company: updatedCompany,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while updating company.",
      success: false,
    });
  }
};

// Delete a company (only owner allowed)
exports.deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated.",
        success: false,
      });
    }

    if (!companyId || isNaN(Number(companyId))) {
      return res.status(400).json({
        message: "Valid company ID is required.",
        success: false,
      });
    }

    // Delete only if company belongs to the user
    const deletedCount = await Company.destroy({
      where: { id: Number(companyId), userId },
    });

    if (deletedCount === 0) {
      return res.status(404).json({
        message: "Company not found or you're not authorized to delete it.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while deleting company.",
      success: false,
    });
  }
};
