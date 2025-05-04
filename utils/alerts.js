// utils/alerts.js
const Loan = require('../models/Loan');
const dayjs = require('dayjs');

const getOverdueLoans = async () => {
  const today = dayjs().toDate();
  return await Loan.find({ dueDate: { $lt: today }, status: 'pending' }).populate('customer');
};

module.exports = { getOverdueLoans };
