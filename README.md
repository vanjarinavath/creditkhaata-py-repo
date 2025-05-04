# CrediKhaata – Loan Tracker for Shopkeepers

CrediKhaata is a simple Node.js/Express backend system that helps shopkeepers track credit sales (loans), repayments, and overdue balances of their customers. It supports customer management, secure user authentication, and detailed summaries of loan activity.

---

## 🚀 Features

- User Authentication (JWT-based)
- Add/Edit/Delete Customers
- Create and Manage Credit Sales (Loans)
- Record and Track Repayments
- Generate Loan Summaries and Overdue Alerts
- Scopes all data to the logged-in shopkeeper

---

## 🛠️ Tech Stack & Dependencies

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- nodemon (for development)

Install all dependencies:
```bash
npm install

🔐 Auth
POST /auth/register
Register a shopkeeper.

Request:

json
Copy
Edit
{
  "email": "shop@example.com",
  "password": "securepassword"
}
Response:

json
Copy
Edit
{
  "message": "User registered successfully"
}
POST /auth/login
Authenticate a shopkeeper.

Request:

json
Copy
Edit
{
  "email": "shop@example.com",
  "password": "securepassword"
}
Response:

json
Copy
Edit
{
  "token": "JWT_TOKEN_HERE"
}
👥 Customers
GET /customers
Get all customers of the logged-in shopkeeper.

Response:

json
Copy
Edit
[
  {
    "_id": "id",
    "name": "John Doe",
    "phone": "1234567890",
    "address": "123 Street",
    "trustScore": 7,
    "creditLimit": 5000
  }
]
POST /customers
Add a new customer.

Request:

json
Copy
Edit
{
  "name": "John Doe",
  "phone": "1234567890",
  "address": "123 Street",
  "trustScore": 8,
  "creditLimit": 5000
}
PUT /customers/:id
Update customer details.

DELETE /customers/:id
Delete a customer.

💳 Loans
POST /loans
Create a new credit sale.

Request:

json
Copy
Edit
{
  "customerId": "customerId123",
  "item": "TV",
  "amount": 10000,
  "issueDate": "2025-05-04",
  "dueDate": "2025-06-04",
  "frequency": "monthly",
  "interest": 5,
  "graceDays": 3
}
GET /loans
List active loans with status (pending, paid, overdue).

GET /loans/:id
Get loan details by ID.

💵 Repayments
POST /repayments
Record a repayment.

Request:

json
Copy
Edit
{
  "loanId": "loan123",
  "amount": 3000,
  "date": "2025-05-05"
}
📈 Summary
GET /summary
Returns:

json
Copy
Edit
{
  "totalLoaned": 20000,
  "totalCollected": 12000,
  "overdueAmount": 3000,
  "avgRepaymentTime": "15 days"
}
GET /summary/overdue
List overdue loans.

🧼 Code Quality Guidelines
✅ Structure: Follow MVC pattern — separate routes, controllers, models.

✅ Best Practices:

Use async/await and try-catch for error handling.

Keep controllers thin — logic should be in models or services.

Sanitize and validate inputs using middleware (e.g., Joi or express-validator).

✅ Security:

Store passwords using bcrypt hashing.

Use .env for sensitive configs.

Validate JWTs using middleware.

✅ Readability:

Use consistent naming conventions (camelCase).

Comment functions for clarity.

Keep functions small and focused.

🎯 Demonstration Instructions
✅ 1. Start the server
bash
Copy
Edit
npm run dev
✅ 2. Register and Login
Use Postman or cURL:

Register:

bash
Copy
Edit
curl -X POST http://localhost:5000/auth/register -H "Content-Type: application/json" -d '{"email":"shop@example.com","password":"123456"}'
Login:

bash
Copy
Edit
curl -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d '{"email":"shop@example.com","password":"123456"}'
Save the token from the login response.

✅ 3. Add a Customer
bash
Copy
Edit
curl -X POST http://localhost:5000/customers -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{
  "name": "Ravi",
  "phone": "9999999999",
  "address": "Mumbai",
  "trustScore": 7,
  "creditLimit": 10000
}'
✅ 4. Create a Loan
bash
Copy
Edit
curl -X POST http://localhost:5000/loans -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{
  "customerId": "<customer_id>",
  "item": "Fridge",
  "amount": 8000,
  "issueDate": "2025-05-04",
  "dueDate": "2025-06-04",
  "frequency": "monthly"
}'
✅ 5. Record a Repayment
bash
Copy
Edit
curl -X POST http://localhost:5000/repayments -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{
  "loanId": "<loan_id>",
  "amount": 4000,
  "date": "2025-05-10"
}'

