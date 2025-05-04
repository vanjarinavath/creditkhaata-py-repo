const Loan = require('../models/Loan');
const Repayment = require('../models/Repayment');
const mongoose = require('mongoose');

// Create a new loan (credit sale)
exports.createLoan = async (req, res) => {
  try {
    const { customerId, item, amount, issueDate, dueDate, frequency, interest, graceDays } = req.body;

    const loan = new Loan({
      user: req.user.id,
      customer: customerId,
      item,
      amount,
      balance: amount,
      issueDate,
      dueDate,
      frequency,
      interest,
      graceDays
    });

    await loan.save();
    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all active loans for the shopkeeper with status
exports.getActiveLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id }).populate('customer');

    const updatedLoans = loans.map((loan) => {
      let status = 'pending';
      if (loan.balance === 0) status = 'paid';
      else if (new Date() > new Date(loan.dueDate)) status = 'overdue';

      return {
        ...loan.toObject(),
        status
      };
    });

    res.json(updatedLoans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Optional: Get loan by ID
exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findOne({ _id: req.params.id, user: req.user.id }).populate('customer');
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
