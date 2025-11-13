const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnect');

const dotenv = require("dotenv");
const { router } = require('./router');
dotenv.config(); // load .env variables


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ["https://books-frontend-pink.vercel.app"], // FE frontend domein
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Routes
app.use("/", router);

// MongoDB connection
connectDB()

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
