const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const loanRoutes = require('./routes/loanRoutes');
const repaymentRoutes = require('./routes/repaymentRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
app.use(express.json());  // Parses incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.use('/auth', authRoutes); // Auth routes (register/login)
app.use('/customers', authMiddleware, customerRoutes);  // Protected customer routes
app.use('/loans', authMiddleware, loanRoutes);  // Protected loan routes
app.use('/repayments', authMiddleware, repaymentRoutes);  // Protected repayment routes
app.use('/summary', authMiddleware, summaryRoutes);  // Protected summary route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
