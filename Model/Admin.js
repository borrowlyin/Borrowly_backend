const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db");

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password_hash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(50),
    defaultValue: "admin",
  },

  // 🔑 OTP-related fields
  reset_otp: {
    type: DataTypes.STRING(6),   // 6-digit OTP
    allowNull: true,
  },
  reset_otp_expires: {
    type: DataTypes.DATE,        // expiry time
    allowNull: true,
  },
  is_otp_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "admins",
  timestamps: false, // we already handle created_at / updated_at manually
});

module.exports = Admin;
