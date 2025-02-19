const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  console.log('Received token:', token);
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.log('Token verification error:', error);
    res.status(400).json({ error: 'Invalid token' });
  }
};