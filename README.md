# Express.js Authentication Backend

This project is a Node.js backend using Express.js, providing authentication features such as user registration, login, access token generation, refresh token generation, and logout functionality. The backend is structured for scalability and maintainability, following a modular approach.

## Features

	- 🔒 User registration and login with password hashing.

	- 🔑 Access token and refresh token generation using JWT.

	- ♻️ Token refresh functionality.

	- 🛡️ Middleware for protected routes.

	- 🚪 Logout functionality with refresh token invalidation.

## File Structure
```
backend/
├── controllers/
│   ├── authController.js
├── middlewares/
│   ├── authenticateToken.js
├── models/
│   ├── userModel.js
│   ├── refreshTokenModel.js
├── routes/
│   ├── authRoutes.js
│   ├── protectedRoutes.js
├── utils/
│   ├── tokenUtils.js
├── app.js
├── server.js
├── .env
├── package.json
```

## File Descriptions
- 📂 **controllers/**: Contains logic for handling API endpoints.
- **authController.js**: Handles user authentication (register, login, refresh token, logout).

- 📂 **middlewares/**: Contains middleware functions.
- **authenticateToken.js**: Middleware to validate access tokens.

- 📂 **models/**: Defines database models (replace in-memory storage with a database for production).
- **userModel.js**: Schema for user data.
- **refreshTokenModel.js**: Schema for refresh tokens.

- 📂 **routes/**: Defines routes for authentication and protected operations.
- **authRoutes.js**: Routes for user registration, login, refresh token, and logout.
- **protectedRoutes.js**: Routes requiring authentication.

- 📂 **utils/**: Helper functions.
- **tokenUtils.js**: Functions for generating access and refresh tokens.
- 🛠️ **app.js**: Configures the Express application and middleware.
- 🚀 **server.js**: Entry point for starting the server.
- 🔧 **.env**: Contains environment variables.

## Getting Started

### Prerequisites

- 📦 **Node.js (v14 or higher)**
- 📦 **npm or yarn**

##Installation

- **Clone the repository:**
```
git clone <repository-url>
cd backend
```
- **Install dependencies:**
```
npm install
```
- **Running the Application**

Start the server:
```
node server.js
The server will run at http://localhost:3000.
```

- **API Endpoints**
```
- Authentication Endpoints
- Register User
```
- **URL**: POST /auth/register

### Payload:
```
{
  "username": "example",
  "password": "password123"
}
```
## Login
```
URL: POST /auth/login
```
### Payload:
```
{
  "username": "example",
  "password": "password123"
}
```
## Response:
```
{
  "accessToken": "<JWT Access Token>"
}
```
## Refresh Token
```
URL: POST /auth/token
Requires: refreshToken cookie.
```
## Response:
```
{
  "accessToken": "<New JWT Access Token>"
}
```
## Logout
```
URL: POST /auth/logout
Clears the refreshToken cookie.
```

## Protected Endpoints

### Access Protected Route
```
URL: GET /protected
Requires: Authorization header with Bearer token.
```

## Response:
```
{
  "message": "This is a protected route",
  "user": { "username": "example" }
}
```
## Notes

- 🗄️ Replace in-memory storage with a database (e.g., MongoDB) for production.

- 🔒 Use HTTPS in production to secure cookies.

- ⚙️ Add rate limiting for sensitive endpoints like login and token refresh.

## Dependencies

- 🚀 **express**: Web framework.

- 🔐 **jsonwebtoken**: For access and refresh token management.

- 🔑 **bcrypt**: For hashing passwords.

- 🌿 **dotenv**: For environment variable management.

- 🍪 **cookie-parser**: For handling cookies.

## License

This project is licensed under the MIT License. See the LICENSE file for detail
