// controllers/newsletterController.js
const NewsletterSubscription = require("../Model/NewsletterSubscription");

// Subscribe (create new subscription)
exports.subscribe = async (req, res) => {
  try {
    const { email_address } = req.body;

    const existing = await NewsletterSubscription.findOne({ where: { email_address } });
    if (existing) {
      return res.status(400).json({ error: "Email already subscribed" });
    }

    const newSub = await NewsletterSubscription.create({
      email_address,
      is_subscribed: true,
      status: "active",
    });

    res.status(201).json(newSub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to subscribe" });
  }
};

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subs = await NewsletterSubscription.findAll();
    res.json(subs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
};

// Get subscription by ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const sub = await NewsletterSubscription.findByPk(req.params.id);
    if (!sub) return res.status(404).json({ error: "Subscription not found" });
    res.json(sub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch subscription" });
  }
};

// Unsubscribe
exports.unsubscribe = async (req, res) => {
  try {
    const sub = await NewsletterSubscription.findByPk(req.params.id);

    if (!sub) return res.status(404).json({ error: "Subscription not found" });

    sub.is_subscribed = false;
    sub.status = "unsubscribed";
    sub.unsubscribed_at = new Date();

    await sub.save();

    res.json({ message: "Unsubscribed successfully", subscription: sub });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to unsubscribe" });
  }
};

// Delete subscription
exports.deleteSubscription = async (req, res) => {
  try {
    const sub = await NewsletterSubscription.findByPk(req.params.id);
    if (!sub) return res.status(404).json({ error: "Subscription not found" });

    await sub.destroy();
    res.json({ message: "Subscription deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete subscription" });
  }
};
