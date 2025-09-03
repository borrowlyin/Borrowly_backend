const express = require("express");
const router = express.Router();
const dashboardController = require("../Controller/dashboardController");

router.get("/stats", dashboardController.getDashboardStats);

module.exports = router;
