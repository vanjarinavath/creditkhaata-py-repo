const express = require('express');
const { createCustomer, getCustomers, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Route to create a new customer
router.post('/', authMiddleware, createCustomer);

// Route to get all customers for the authenticated user (shopkeeper)
router.get('/', authMiddleware, getCustomers);

// Route to update a customer
router.put('/:id', authMiddleware, updateCustomer);

// Route to delete a customer
router.delete('/:id', authMiddleware, deleteCustomer);

module.exports = router;
