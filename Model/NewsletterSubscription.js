// models/NewsletterSubscription.js
const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db");

const NewsletterSubscription = sequelize.define("NewsletterSubscription", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email_address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  is_subscribed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  status: {
    type: DataTypes.ENUM("active", "unsubscribed", "pending"),
    allowNull: false,
    defaultValue: "active",
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  unsubscribed_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "newsletter_subscriptions",
  timestamps: false,
});

module.exports = NewsletterSubscription;
