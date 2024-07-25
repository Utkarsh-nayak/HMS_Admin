const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SECRET';

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateToken;
