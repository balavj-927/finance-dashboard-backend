# 💰 Finance Dashboard Backend API

A robust, role-based finance data management backend built with **Node.js**, **Express**, and **MongoDB**. This system supports financial record management, user role administration, and dashboard-level analytics — designed to serve a finance dashboard frontend.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **express-validator** | Input validation |
| **Helmet** | Security headers |
| **Morgan** | HTTP request logging |
| **CORS** | Cross-origin support |

---

## 📁 Project Structure

```
finance-dashboard-backend/
├── src/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── middlewares/
│   │   ├── auth.middleware.js      # JWT verification
│   │   └── role.middleware.js      # Role-based access guard
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   └── auth.service.js
│   │   ├── users/
│   │   │   ├── user.model.js
│   │   │   ├── user.routes.js
│   │   │   ├── user.controller.js
│   │   │   └── user.service.js
│   │   ├── records/
│   │   │   ├── record.model.js
│   │   │   ├── record.routes.js
│   │   │   ├── record.controller.js
│   │   │   └── record.service.js
│   │   └── dashboard/
│   │       ├── dashboard.routes.js
│   │       ├── dashboard.controller.js
│   │       └── dashboard.service.js
│   ├── utils/
│   │   ├── ApiError.js            # Custom error class
│   │   ├── ApiResponse.js         # Consistent response wrapper
│   │   └── asyncHandler.js        # Async error catcher
│   └── app.js                     # Express app setup
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js                      # Entry point
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js >= 14
- MongoDB running locally

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/balavj-927/finance-dashboard-backend.git

# 2. Navigate into the project
cd finance-dashboard-backend

# 3. Install dependencies
npm install

# 4. Create environment file
cp .env.example .env
```

### Configure Environment Variables

Open `.env` and update the values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance_dashboard
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Run the Server

```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

Server runs at: `http://localhost:5000`

---

## 👥 Roles & Permissions

| Action | Viewer | Analyst | Admin |
|---|---|---|---|
| View Records | ✅ | ✅ | ✅ |
| Create Records | ❌ | ✅ | ✅ |
| Update Records | ❌ | ✅ | ✅ |
| Delete Records | ❌ | ❌ | ✅ |
| View Dashboard Summary | ❌ | ✅ | ✅ |
| View Category Breakdown | ❌ | ✅ | ✅ |
| View Monthly Trends | ❌ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |

---

## 📡 API Endpoints

### 🔑 Auth Routes
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Public | Register new user |
| POST | `/api/v1/auth/login` | Public | Login user |
| GET | `/api/v1/auth/me` | All roles | Get current user profile |

#### Register
```json
POST /api/v1/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "analyst"
}
```

#### Login
```json
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### 💰 Record Routes
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/v1/records` | All roles | Get all records (with filters) |
| POST | `/api/v1/records` | Analyst, Admin | Create new record |
| GET | `/api/v1/records/:id` | All roles | Get single record |
| PUT | `/api/v1/records/:id` | Analyst, Admin | Update record |
| DELETE | `/api/v1/records/:id` | Admin only | Soft delete record |

#### Create Record
```json
POST /api/v1/records
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-05",
  "notes": "Monthly salary"
}
```

#### Supported Categories
```
income:  salary, freelance, investment
expense: food, transport, utilities, entertainment,
         healthcare, shopping, education, other
```

---

### 🔍 Record Filtering & Pagination

```
GET /api/v1/records?type=income
GET /api/v1/records?type=expense
GET /api/v1/records?category=salary
GET /api/v1/records?startDate=2026-01-01&endDate=2026-12-31
GET /api/v1/records?type=expense&category=food
GET /api/v1/records?page=1&limit=5
GET /api/v1/records?type=income&category=salary&startDate=2026-01-01&endDate=2026-12-31&page=1&limit=5
```

| Query Param | Type | Description |
|---|---|---|
| `type` | String | Filter by `income` or `expense` |
| `category` | String | Filter by category name |
| `startDate` | ISO Date | Filter records from this date |
| `endDate` | ISO Date | Filter records until this date |
| `page` | Number | Page number (default: 1) |
| `limit` | Number | Records per page (default: 10) |

---

### 📊 Dashboard Routes
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/v1/dashboard/summary` | Analyst, Admin | Total income, expenses, net balance |
| GET | `/api/v1/dashboard/categories` | Analyst, Admin | Category-wise breakdown |
| GET | `/api/v1/dashboard/trends` | Analyst, Admin | Monthly trends |
| GET | `/api/v1/dashboard/recent` | Analyst, Admin | Recent activity |

```
GET /api/v1/dashboard/summary
GET /api/v1/dashboard/categories
GET /api/v1/dashboard/trends?year=2026
GET /api/v1/dashboard/recent?limit=5
```

#### Sample Summary Response
```json
{
  "totalIncome": 8000,
  "totalExpenses": 4300,
  "netBalance": 3700,
  "incomeCount": 2,
  "expenseCount": 3,
  "totalRecords": 5
}
```

---

### 👤 User Management Routes (Admin Only)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/users` | List all users (paginated) |
| GET | `/api/v1/users/:id` | Get single user |
| PATCH | `/api/v1/users/:id/role` | Update user role |
| PATCH | `/api/v1/users/:id/status` | Activate/deactivate user |
| DELETE | `/api/v1/users/:id` | Delete user |

---

## 🔐 Authentication

All protected routes require a **Bearer Token** in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Get your token by logging in via `/api/v1/auth/login`.

---

## ✅ Sample API Response Format

### Success Response
```json
{
  "statusCode": 200,
  "data": { },
  "message": "Records fetched successfully",
  "success": true
}
```

### Error Response
```json
{
  "success": false,
  "message": "Access denied. No token provided.",
  "errors": [],
  "stack": "..."
}
```

---

## 🏗️ Key Design Decisions

### 1. Modular Architecture
Each feature (auth, users, records, dashboard) is organized as an independent module with its own routes, controller, and service — keeping the codebase clean and maintainable.

### 2. JWT Authentication
Stateless JWT tokens are used for authentication, making the system scalable and easy to integrate with any frontend.

### 3. Role-Based Access Control
Authorization is enforced at the middleware level using a reusable `authorize()` guard. Roles are embedded in the JWT token and verified on every request.

### 4. Soft Delete
Financial records use an `isDeleted` flag instead of permanent deletion. A Mongoose pre-find hook automatically excludes soft-deleted records from all queries, ensuring data is never permanently lost.

### 5. MongoDB Aggregation Pipelines
Dashboard APIs use MongoDB aggregation pipelines to compute totals, category breakdowns, and monthly trends efficiently at the database level.

### 6. Centralized Error Handling
Custom `ApiError` and `ApiResponse` utility classes ensure a consistent response structure across all endpoints. A global error handler middleware catches all errors.

---

## 📋 Assumptions Made

- Admin accounts can only be promoted by another admin. Self-registration defaults to `viewer` role for security.
- Dashboard APIs require a minimum of `analyst` role.
- Soft delete is used for records — data is never permanently removed.
- JWT tokens expire in 7 days by default.
- MongoDB is running locally on the default port `27017`.

---

## 🔒 Security Features

- Passwords hashed using **bcryptjs** with salt rounds of 12
- **Helmet** middleware for secure HTTP headers
- JWT token expiry enforced
- Input validation on all POST/PUT routes
- Role-based route protection
- Inactive user accounts blocked from login

---

## 👨‍💻 Author

**Bala VJ**
- GitHub: [@balavj-927](https://github.com/balavj-927)

---

## 📄 License

This project is built for internship assessment purposes.
