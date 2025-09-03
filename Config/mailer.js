const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",  // Hostinger SMTP server
  port: 465,                   // SSL
  secure: true,                // use SSL
  auth: {
    user: process.env.MAIL_USER, // your Hostinger email
    pass: process.env.MAIL_PASS, // your Hostinger email password
  },
});

module.exports = transporter;
