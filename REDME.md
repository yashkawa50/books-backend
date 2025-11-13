# ⚙️ Backend Setup Guide

Follow the steps below to set up and run the backend server for this project.

## 1. Navigate to the Backend Folder
After cloning the project, open your terminal and go into the backend directory:
```bash
cd backend
```

## 2. Create a `.env` File
Inside the backend folder, create a new file named `.env` and add the following content:

```
PORT=5000

# Local URL
MONGO_URI=mongodb://127.0.0.1:27017/schoolDB

# Live URL
# MONGO_URI=mongodb+srv://bookstore:admin123@cluster0.nhloyky.mongodb.net/

ACCESS_TOKEN_SECRET=library
REFRESH_TOKEN_SECRET=megamind
```

### Description of Variables
- **PORT** – Defines the port on which the backend server will run (default is `5000`).
- **MONGO_URI** – The MongoDB connection string. Use the local one for development or uncomment the live one for production.
- **ACCESS_TOKEN_SECRET** – Secret key used for generating JWT access tokens.
- **REFRESH_TOKEN_SECRET** – Secret key used for generating JWT refresh tokens.

## 3. Install Dependencies
Run the following command to install all backend dependencies:
```bash
npm install
```

## 4. Start the Backend Server
Once installation is complete, start the backend using:
```bash
npm run dev
```

Your backend server should now be running at:
```
http://localhost:5000/
```

---

## 🧩 Notes
- Ensure MongoDB is running locally if you're using the local URI.
- Update environment variables as needed for production deployment.
