// validation/auth.js
const Joi = require("joi");

// Signup validation schema
const signupSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Enter a valid email",
    }),
    password: Joi.string().min(4).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 4 characters",
    }),
});

// Login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Enter a valid email",
    }),
    password: Joi.string().min(4).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 4 characters",
    }),
});

module.exports = { signupSchema, loginSchema };
