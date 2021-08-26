const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({ success: false, message: 'Token Not Found' });
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid Token' });
  }
}

module.exports = verifyToken;