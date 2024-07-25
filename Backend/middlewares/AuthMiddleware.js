const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SECRET';

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(403);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log("user : " + JSON.stringify(user))
    next();
  });
};

module.exports = authenticateToken;
