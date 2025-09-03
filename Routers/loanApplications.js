// routes/loanApplications.js
const express = require("express");
const router = express.Router();
const loanController = require("../Controller/loanApplicationController");

// User
router.post("/", loanController.createLoanApplication);

// Admin
router.get("/", loanController.getAllLoanApplications);
router.get("/:id", loanController.getLoanApplicationById);
router.put("/:id/status", loanController.updateLoanStatus);
router.delete("/:id", loanController.deleteLoanApplication);

module.exports = router;
