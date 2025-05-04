const Customer = require('../models/Customer');

// Create a customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, phone, address, trustScore, creditLimit } = req.body;

    const customer = new Customer({
      user: req.user.id,
      name,
      phone,
      address,
      trustScore,
      creditLimit
    });

    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all customers for the shopkeeper
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user.id });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
