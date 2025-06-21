# Task Management API

A robust Node.js/Express/TypeScript API for user authentication and task management, built with TypeORM, PostgreSQL, JWT, and express-validator.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens and bcrypt password hashing
- **Task Management**: Full CRUD operations for tasks, scoped to authenticated users
- **Input Validation**: Centralized validation with express-validator and global error handling middleware
- **Data Security**: Secure response handling with class-transformer to exclude sensitive data
- **Database Integration**: TypeORM with PostgreSQL for robust data persistence
- **Type Safety**: Built with TypeScript for enhanced development experience

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: v18 or higher
- **PostgreSQL**: v13 or higher  
- **npm**: v8 or higher
- A PostgreSQL database instance (local or hosted)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/task-management-api.git
   cd task-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=
   DB_USER=
   DB_PASSWORD=
   DB_NAME=
   JWT_SECRET=
   NODE_ENV= 
   ```
   
   > **Note**: Replace `your_jwt_secret_key_here` with a secure, randomly generated secret key.

4. **Set up the database**
   
   Ensure PostgreSQL is running, then create your database:
   ```bash
   createdb task_db
   ```

## 🏃‍♂️ Running the Application

### Development Mode
Run with hot reloading using ts-node-dev:
```bash
npm run dev
```

If you need to install ts-node-dev:
```bash
npm install --save-dev ts-node-dev
```

### Production Mode
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start the application**
   ```bash
   npm run start
   ```

## 🔐 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Tasks
- `GET /tasks` - Get all tasks for authenticated user
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a specific task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

> **Note**: All task endpoints require JWT authentication via the `Authorization: Bearer <token>` header.

## 🛡️ Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication with JSON Web Tokens
- **Input Validation**: Server-side validation using express-validator
- **Data Sanitization**: Sensitive data exclusion with class-transformer
- **Error Handling**: Centralized error handling middleware

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (default: 3000) |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `DB_USER` | PostgreSQL Database User | Yes |
| `DB_PASSWORD` | PostgreSQL Database Password | Yes |
| `DB_NAME` | PostgreSQL Database Name | Yes |
| `NODE_ENV` | Application Environment | Yes (default: Local) |


## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
- Ensure PostgreSQL is running
- Verify your credentials is correct
- check `.env.example` for env variables
- Check if the database exists

**JWT Authentication Failed**
- Verify `JWT_SECRET` is set in your `.env` file
- Ensure the token is properly formatted in the Authorization header

**Port Already in Use**
- Change the `PORT` in your `.env` file

Built with Node.js, TypeScript, and PostgreSQL
