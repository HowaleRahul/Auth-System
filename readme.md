# 🛡️ Auth-System

Simple Node/Express authentication demo using JSON file storage, JWTs, cookies and logging.

> ⚠️ **Not intended for production.**
> This project is for learning and prototyping only – user data is stored in `users.json`, and secrets are held in environment variables.

---

## 📁 Project Structure

```
├── app.js
├── server.js
├── users.json
├── controllers/
│   └── user.js
├── middlewares/
│   ├── authenticateToken.js
│   └── logger.js
├── models/
│   └── user.js
├── routes/
│   ├── login.js
│   ├── logout.js
│   └── register.js
└── utils/
    └── passwordHash.js
```

---

## 🚀 Features

- **User registration** with automatic secure password generation
- **Login** with JWT issued and stored as a cookie
- **Logout** clears the auth cookie
- **Protected endpoints** require a valid JWT in the `Authorization` header
- Passwords hashed with `bcrypt`
- Winston-based request & error logging

---

## 🧩 Prerequisites

- Node.js 14+
- npm (or yarn)

---

## ⚙️ Setup & Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd Auth-System
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```
   JWT_SECRET=your_secret_key
   PORT=3000         # optional, defaults to 3000 in server.js
   ```

4. Ensure `users.json` exists (an empty array is fine):

   ```json
   []
   ```

---

## 🧪 Running the App

- Start the server:

  ```bash
  npm start
  ```

- Or for development with automatic restarts:

  ```bash
  npm run dev
  ```

Server listens on `http://localhost:3000` (or the port configured via `PORT`).

---

## 📬 API Endpoints

| Method | Path           | Description                                 | Auth required? |
|--------|----------------|---------------------------------------------|----------------|
| POST   | `/register`    | Register new user (name, email)             | No             |
| POST   | `/login`       | Log in (email, password)                    | No             |
| POST   | `/logout`      | Log out (clears cookie)                     | No             |
| POST   | `/`            | Return all users (protected)                | Yes (Bearer)   |
| POST   | `/contact`     | Same as `/` (protected)                     | Yes            |

> **Note:** protected routes check for `Authorization: Bearer <token>` header.

### Request/Response Examples

**Register**

```bash
curl -X POST http://localhost:3000/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Alice","email":"alice@example.com"}'
```

**Login**

```bash
curl -X POST http://localhost:3000/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice@example.com","password":"<generated>"}'
```

On successful login you’ll receive a JWT and a `token` cookie.

---

## 🛠️ Utilities

- `controllers/user.js` – business logic for register/login
- `models/user.js` – simple JSON file read/write
- `middlewares/authenticateToken.js` – JWT verification
- `middlewares/logger.js` – Winston logger
- `utils/passwordHash.js` – bcrypt helpers

---

## 👷 Logging

Requests and errors are logged to:

- `combind.log` – general logs
- `errorLogs.log` – error-level logs
- Console output (colorized)

---

## 📘 Notes

- Passwords are generated and emailed in a real app; here they just return with the response.
- JWT expires in 5 minutes (`expiresIn: "5m"`).
- This code is educational; adapt or rewrite for production use.

---

Feel free to fork, play around, and extend!  
Happy coding 😊