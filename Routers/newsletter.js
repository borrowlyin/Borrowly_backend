// routes/newsletter.js
const express = require("express");
const router = express.Router();
const newsletterController = require("../Controller/newsletterController");

// User
router.post("/", newsletterController.subscribe);          
router.put("/:id/unsubscribe", newsletterController.unsubscribe); 

// Admin
router.get("/", newsletterController.getAllSubscriptions);
router.get("/:id", newsletterController.getSubscriptionById);
router.delete("/:id", newsletterController.deleteSubscription);

module.exports = router;
