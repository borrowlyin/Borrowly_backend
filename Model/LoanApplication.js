// models/LoanApplication.js
const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db");

const LoanApplication = sequelize.define("LoanApplication", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loan_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "reviewed", "rejected", "cancel"),
    allowNull: false,
    defaultValue: "pending",
  },
  status_reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  modified_status_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "loan_applications",
  timestamps: false,
});

module.exports = LoanApplication;
