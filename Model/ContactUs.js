// models/ContactUs.js
const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db");

const ContactUs = sequelize.define("ContactUs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  has_active_loan: {
    type: DataTypes.BOOLEAN,
    allowNull: false, // true = Yes, false = No
  },
  status: {
    type: DataTypes.ENUM("pending", "reviewed", "resolved", "closed"),
    allowNull: false,
    defaultValue: "pending",
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "contact_us",
  timestamps: false,
});

module.exports = ContactUs;
