const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  phone: String,
  address: String,
  trustScore: { type: Number, min: 0, max: 10 },
  creditLimit: Number,
});
module.exports = mongoose.model('Customer', customerSchema);
