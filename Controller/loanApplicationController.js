// controllers/loanApplicationController.js
const LoanApplication = require("../Model/LoanApplication");
const { Op } = require("sequelize");

exports.createLoanApplication = async (req, res) => {
  try {
    const { full_name, email_address, contact_number, loan_type } = req.body;
    const newApp = await LoanApplication.create({
      full_name,
      email_address,
      contact_number,
      loan_type,
    });
    res.status(201).json(newApp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create loan application" });
  }
};

// Get all loan applications

exports.getLoanApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status, loanType } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    if (status && status !== "all") {
      where.status = status;
    }

    if (loanType && loanType !== "all") {
      where.loan_type = loanType;
    }

    if (search) {
      where[Op.or] = [
        { full_name: { [Op.iLike]: `%${search}%` } },
        { email_address: { [Op.iLike]: `%${search}%` } },
        { contact_number: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { rows, count } = await LoanApplication.findAndCountAll({
      where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [["created_at", "DESC"]],
    });

    res.json({
      data: rows,
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch loan applications" });
  }
};

// Get single loan application by ID
exports.getLoanApplicationById = async (req, res) => {
  try {
    const app = await LoanApplication.findByPk(req.params.id);
    if (!app) return res.status(404).json({ error: "Application not found" });
    res.json(app);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch loan application" });
  }
};

// Update loan application status (Admin)
exports.updateLoanStatus = async (req, res) => {
  try {
    const { status, status_reason } = req.body;
    const app = await LoanApplication.findByPk(req.params.id);

    if (!app) return res.status(404).json({ error: "Application not found" });

    app.status = status;
    if (status === "rejected" || status === "cancel") {
      app.status_reason = status_reason;
    } else {
      app.status_reason = null;
    }
    app.modified_status_time = new Date();

    await app.save();

    res.json(app);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update status" });
  }
};

// Delete loan application
exports.deleteLoanApplication = async (req, res) => {
  try {
    const app = await LoanApplication.findByPk(req.params.id);
    if (!app) return res.status(404).json({ error: "Application not found" });

    await app.destroy();
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete loan application" });
  }
};
