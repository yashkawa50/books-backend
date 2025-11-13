const express = require("express");
const { getBooks, addBook } = require("./contoller/bookController");
const { loginSchema, signupSchema } = require("./middleware/auth");
const { login, signUp } = require("./contoller/userController");
const validate = require("./middleware/validate");
const { authMiddleware, newAccessToken } = require("./middleware/authMiddleware");
const app = express();

app.get("/books", authMiddleware, getBooks)
app.post("/books", authMiddleware, addBook)

app.post("/login", validate(loginSchema), login)
app.post("/register", validate(signupSchema), signUp)

app.get("/token/refresh", newAccessToken)

module.exports = app