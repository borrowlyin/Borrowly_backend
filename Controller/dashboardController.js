const LoanApplication = require("../Model/LoanApplication");
const ContactUs = require("../Model/ContactUs");
const { Op, fn, col } = require("sequelize");

exports.getDashboardStats = async (req, res) => {
  try {
    const startOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const startOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
    const endOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0);

    // ===== Loan counts =====
    const loanThisMonth = await LoanApplication.count({
      where: { created_at: { [Op.gte]: startOfThisMonth } }
    });
    const loanLastMonth = await LoanApplication.count({
      where: { created_at: { [Op.between]: [startOfLastMonth, endOfLastMonth] } }
    });

    const loanChange = loanLastMonth === 0
      ? (loanThisMonth === 0 ? "0%" : "+100%")
      : (((loanThisMonth - loanLastMonth) / loanLastMonth) * 100).toFixed(1) + "%";

    // ===== Contact counts =====
    const contactThisMonth = await ContactUs.count({
      where: { created_at: { [Op.gte]: startOfThisMonth } }
    });
    const contactLastMonth = await ContactUs.count({
      where: { created_at: { [Op.between]: [startOfLastMonth, endOfLastMonth] } }
    });

    const contactChange = contactLastMonth === 0
      ? (contactThisMonth === 0 ? "0%" : "+100%")
      : (((contactThisMonth - contactLastMonth) / contactLastMonth) * 100).toFixed(1) + "%";

    // ===== Top Loan Types this month =====
    const loanTypes = await LoanApplication.findAll({
      attributes: [
        "loan_type",
        [fn("COUNT", col("id")), "total_querries"]
      ],
      where: { created_at: { [Op.gte]: startOfThisMonth } },
      group: ["loan_type"],
      order: [[fn("COUNT", col("id")), "DESC"]]
    });

    const topLoanTypes = loanTypes.map((item, index) => ({
      rank: index + 1,
      loan_type: item.loan_type,
      total_querries: parseInt(item.get("total_querries"))
    }));

    // ===== Response =====
    res.json({
      loan_enquiries: {
        total: loanThisMonth,
        monthly_change: loanChange
      },
      contact_messages: {
        total: contactThisMonth,
        monthly_change: contactChange
      },
      top_loan_types: topLoanTypes
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
