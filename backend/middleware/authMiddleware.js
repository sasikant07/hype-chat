const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    res.status(401).json({
      error: { errorMessage: ["Please login"] },
    });
  } else {
    try {
      const decodeToken = await jwt.verify(authToken, process.env.SECRET);
      req.myId = decodeToken.id;
      next();
    } catch (error) {
      res.status(500).json({
        error: { errorMessage: error },
      });
    }
  }
};
