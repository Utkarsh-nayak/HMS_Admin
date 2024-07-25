const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../Controller/authapi');
const validateSchema = require('../Controller/validation/userValidation');
// const authenticateToken = require('../middlewares/AuthMiddleware');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SECRET';
const router = express.Router();
const {findUserId} = require('../Controller/authapi')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */

router.post('/register', validateSchema, registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/protected', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(403);
let user1 ;
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    // req.user = user;
    user1 = user
  });
  
  findUserId(user1.userId,req,res)

});

module.exports = router;
