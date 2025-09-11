const jwt = require('jsonwebtoken');

const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Please login frist then proceed",
                success: false,
            });
        }

        try {
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            req.id = decode.userId;
            next();
        } catch (err) {
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

module.exports = isAuthenticated;