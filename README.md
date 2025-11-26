🛠️ Expense Tracker – Backend (Node.js + Express + MongoDB)

A secure backend REST API built using Node.js, Express, and MongoDB, supporting authentication and CRUD operations for an expense tracking system.

This backend powers the Android app built for an internship submission.

🚀 Features
🔐 Authentication (JWT)

Register User

Login User

Access Token + Refresh Token

Auto Refresh Access Token when expired

Secure password hashing with bcrypt

Token stored in HTTP-only cookies (optional)

💰 Expense Management

Create Expense

Get All Expenses

Update Expense

Delete Expense

All routes protected (requires Bearer token)

⚙️ Developer Friendly

Modular folder structure

Error handling middleware

Connected with MongoDB using Mongoose

Validations & cleaner API responses

Async handler to avoid try/catch clutter

📁 Folder Structure
backend/
├── src/
│   ├── controllers/
│   │   ├── user.controller.js
│   │   └── expense.controller.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── expense.model.js
│   │
│   ├── routes/
│   │   ├── user.routes.js
│   │   └── expense.routes.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── utils/
│   │   ├── ApiResponse.js
│   │   ├── ApiError.js
│   │   ├── asyncHandler.js
│   │   └── constants.js
│   │
│   ├── db/
│   │   └── index.js (MongoDB connection)
│   │
│   └── app.js
│
├── package.json
├── .env.example
└── server.js

🔧 Installation
1️⃣ Install dependencies
cd backend
npm install

2️⃣ Create .env file

Create:

MONGO_URI=your_mongo_url
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_other_secret
ACCESS_TOKEN_EXPIRY=10m
REFRESH_TOKEN_EXPIRY=7d
PORT=3000

🔗 API Endpoints
🧑‍💻 User Routes
Method	Endpoint	Description
POST	/api/v1/user/register-user	Register user
POST	/api/v1/user/login-user	Login user
POST	/api/v1/user/refresh-access-token	Refresh Access Token
💰 Expense Routes
Method	Endpoint	Description
POST	/api/v1/expense/create-expense	Add expense
GET	/api/v1/expense/get-expense	Get all expenses
PATCH	/api/v1/expense/update-expense/:id	Update expense
DELETE	/api/v1/expense/delete-expense/:id	Delete expense
▶️ How to Run
npm run dev


Backend runs on:

http://localhost:3000


Android uses:

http://10.0.2.2:3000/api/v1/

🛡️ Authentication Flow

User logs in → backend returns accessToken + refreshToken

Every request uses Bearer accessToken

If access token expires → backend returns 401

Android app automatically calls:

POST /user/refresh-access-token


Backend issues new tokens

Original request is retried automatically

📦 API Response Format

Every response uses unified structure:

{
  "success": true,
  "message": "Some message",
  "data": { ... }
}


Errors follow:

{
  "success": false,
  "message": "Error message"
}

📝 What I Learned

JWT Auth with Refresh Tokens

Writing modular Express API

MongoDB with Mongoose

Middleware & error handling

Connecting Android app to Node.js backend
