const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = () => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "No token provided." });
      }

      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
          }
          return res.status(403).json({ success: false, message: "Invalid token." });
        }

        // Attach decoded token info to request
        req.user = {
          _id: decoded.userId, // match with how you generated it in login
          email: decoded.email,
          userType: decoded.userType
        };

        next();
      });

    } catch (error) {
      console.error("Authentication error:", error.message);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  };
};

module.exports = { auth };
