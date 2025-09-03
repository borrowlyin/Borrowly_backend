const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const sequelize = require("./Config/db");

const app = express();
const PORT = process.env.PORT || 8080;

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is missing');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.use("/api/loan-applications", require('./Routers/loanApplications'));
app.use("/api/contact-us", require('./Routers/contactUs'));
app.use("/api/newsletter", require('./Routers/newsletter'));
app.use("/api/admin", require('./Routers/adminRoutes'));

app.use("/api/dashboard", require('./Routers/dashboardRoutes'));

sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database error:", err));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
