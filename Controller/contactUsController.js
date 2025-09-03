// controllers/contactUsController.js
const { Op } = require("sequelize");
const ContactUs = require("../Model/ContactUs");

// Create new contact message
exports.createContact = async (req, res) => {
  try {
    const { phone_number, email_address, message, has_active_loan } = req.body;
    const newContact = await ContactUs.create({phone_number,email_address,message,has_active_loan,});
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create contact" });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status } = req.query;
    const offset = (page - 1) * limit;
    let where = {};
    // Search (only by email or phone)
    if (search) {
      where[Op.or] = [{ email_address: { [Op.iLike]: `%${search}%` } },{ phone_number: { [Op.iLike]: `%${search}%` } },];
    }

    if (status) {
      where.status = status;
    }

    const { count, rows } = await ContactUs.findAndCountAll({where,limit: parseInt(limit),offset: parseInt(offset),order: [["created_at", "DESC"]],});
    res.json({data: rows,total: count,page: parseInt(page),totalPages: Math.ceil(count / limit),limit: parseInt(limit),});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

// Get single contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await ContactUs.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
};

// Update contact status (Admin)
exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await ContactUs.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    contact.status = status;
    await contact.save();
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update status" });
  }
};

// Delete contact message
exports.deleteContact = async (req, res) => {
  try {
    const contact = await ContactUs.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    await contact.destroy();
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
};
