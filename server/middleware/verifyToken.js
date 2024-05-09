import jwt from "jsonwebtoken";

// Middleware to verify the provided token and extract user information
const verifyToken = (req, res, next) => {
  const token = req.headers.token || req.headers.Token; // Extract token from headers 
  if (!token) {
    return res.status(401).json("You are not authenticated!"); // No token provided
  }

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json("Invalid Token!"); // Invalid token
    }
    req.user = user; // Attach user information to request object
    next(); // Move to next middleware or route handler
  });
};
 
export {
  verifyToken, 
};
