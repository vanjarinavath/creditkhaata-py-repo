const express = require('express');
const { createLoan, getActiveLoans, getLoanById } = require('../controllers/loanController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Route to create a new loan
router.post('/', authMiddleware, createLoan);

// Route to get all active loans for the authenticated user (shopkeeper)
router.get('/', authMiddleware, getActiveLoans);

// Route to get loan details by ID
router.get('/:id', authMiddleware, getLoanById);

module.exports = router;
