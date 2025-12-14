# Sweet Shop Management System (TDD Kata)
## Tech Stack: Node.js, TypeScript, Express, Prisma, SQLite, React, Jest
Development Methodology: Test-Driven Development (TDD)

### Project Overview
The Sweet Shop Management System is a full-stack web application developed as part of the Incubyte TDD Kata.
The project demonstrates backend API development, database integration, authentication, frontend interaction, and strict adherence to Test-Driven Development (TDD) practices.

The system enables secure user authentication, sweets inventory management, purchasing workflows, and searching/filtering functionality.

### Features Implemented
### Authentication (JWT-Based)
User registration

User login

Password hashing using bcrypt

JWT token generation

Protected API routes using middleware

### Sweets Management (Protected APIs)
Add a new sweet

View all sweets

Update sweet details

Delete sweet (Admin only)

#### Search sweets by:

Name

Category

Price range

### Inventory Management
Purchase a sweet (quantity decreases)

Validation to prevent over-purchase

Restock sweets (Admin only)

### Testing (TDD)
Tests written before implementation

Jest + Supertest used for testing

Authentication tests

Sweets CRUD tests

Inventory purchase and restock tests

Search functionality tests

## Frontend (SPA)
Built using React + TypeScript (Vite)

Login screen

Dashboard displaying sweets

Purchase button disabled when quantity is zero

Backend API integration

### Database
SQLite (persistent database)

Prisma ORM for schema management and queries

### Models
User

Sweet

## Project Structure
pgsql
Copy code
sweet-shop/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── tests/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── jest.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md


### Setup Instructions
Prerequisites
Node.js (v18 or higher)

npm

Git

### Backend Setup
cd backend
npm install
### Create .env file:

env
DATABASE_URL="file:./dev.db"
JWT_SECRET="supersecretkey"
### Run database migrations:

npx prisma migrate dev
### Start backend server:

npm run dev
### Backend runs on:

http://localhost:4000
## Running Backend Tests
npm test


Frontend Setup
cd frontend
npm install
npm run dev
### Frontend runs on:

http://localhost:5173
## API Testing Using Postman
### Register User
POST http://localhost:4000/api/auth/register
### Request body:

json
{
  "email": "user@example.com",
  "password": "123456"
}
### Login User

POST http://localhost:4000/api/auth/login


### Authorization Header for Protected APIs

Authorization: Bearer <JWT_TOKEN>
### Test Report
Authentication tests: Passed

Sweets CRUD tests: Passed

Inventory purchase and restock tests: Passed

Search functionality tests: Passed

Testing Framework: Jest + Supertest
Coverage Focus: Backend business logic and API flows

### My AI Usage
AI Tools Used
ChatGPT

### How AI Was Used
Generating initial project scaffolding

Writing boilerplate unit and integration tests

Debugging Prisma, TypeScript, and Jest issues

Refining API logic and error handling

Structuring documentation

### Reflection
AI tools significantly improved development speed and debugging efficiency.
All AI-generated code was reviewed, modified, and fully understood before use.
Architectural decisions and business logic were implemented independently.


## Author
Aditya Patel

Frontend SPA implemented

AI usage clearly documented

Author
Aditya Patel
