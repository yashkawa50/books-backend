const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper: generate tokens
const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET || "library",
        { expiresIn: "1h" } // short expiry for security
    );

    const refreshToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET || "megamind",
        { expiresIn: "7d" } // longer expiry
    );

    return { accessToken, refreshToken };
};

// Signup Controller
const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check already user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists.",
            });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        });
    } catch (error) {
        console.error("Error in signup:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while signup",
        });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not exists",
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user);
        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while login",
        });
    }
};

module.exports = { signUp, login };
