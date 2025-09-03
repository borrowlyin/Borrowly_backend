// controllers/contactUsController.js
const ContactUs = require("../Model/ContactUs");

// Create new contact message
exports.createContact = async (req, res) => {
  try {
    const { phone_number, email_address, message, has_active_loan } = req.body;
    const newContact = await ContactUs.create({
      phone_number,
      email_address,
      message,
      has_active_loan,
    });
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create contact" });
  }
};

// Get all contact messages
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactUs.findAll();
    res.json(contacts);
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
