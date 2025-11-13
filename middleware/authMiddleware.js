const jwt = require("jsonwebtoken");


const tokenVerify = (token, secreyKey) => {
    try {
        // Verify the token
        return jwt.verify(token, secreyKey);
    } catch (error) {
        throw error
    }
}
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if token is provided
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access token missing or invalid" });
        }

        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = tokenVerify(token, process.env.ACCESS_TOKEN_SECRET);

        // Token is valid attach user info to request
        req.user = decoded;
        next();
    } catch (error) {
        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Access token expired" });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid access token" });
        }

        // Any other error
        return res.status(500).json({ message: "Authentication failed" });
    }
};


const newAccessToken = (req, res) => {
    try {
        const refreshToken = req.headers.refreshtoken;
        // Check if token is provided
        if (!refreshToken) {
            return res.status(401).json({ message: "Access token missing or invalid" });
        }

        // Verify the token
        const decoded = tokenVerify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (decoded) {
            return res.status(200).json({
                access_token: jwt.sign({ id: decoded._id, email: decoded.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s" })
            })
        }
    } catch (error) {
        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Access token expired" });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid access token" });
        }

        // Any other error
        return res.status(500).json({ message: "Authentication failed" });
    }
}
module.exports = { authMiddleware, newAccessToken };
