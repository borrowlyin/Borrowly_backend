// routes/contactUs.js
const express = require("express");
const router = express.Router();
const contactController = require("../Controller/contactUsController");

// User
router.post("/", contactController.createContact);

// Admin
router.get("/", contactController.getAllContacts);
router.get("/:id", contactController.getContactById);
router.put("/:id/status", contactController.updateContactStatus);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
