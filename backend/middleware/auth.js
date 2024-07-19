import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    try {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("Not Authorized. Please log in again.");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("No token provided. Please log in again.");
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = tokenDecode.id; // Assuming you want to attach userId to the request body

        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return res.status(401).json({ success: false, message: error.message || "Invalid token. Please log in again." });
    }
};

export default authMiddleware;
