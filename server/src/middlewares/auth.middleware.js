// This middleware ensures that only logged-in users
// can access protected routes (login compulsory)

export const authMiddleware = (req, res, next) => {
  try {
    // For assignment: user id is passed via header
    // In real apps, this comes from JWT token
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: Login required",
      });
    }

    // Attach user info to request object
    req.user = { id: userId };

    next();
  } catch (error) {
    res.status(500).json({ message: "Authentication failed" });
  }
};
