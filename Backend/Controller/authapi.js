const bcrypt = require("bcryptjs");
// const { createUser, findUserByEmail } = require('../models/userModel');
const generateToken = require("../utils/generateToken");
const connection = require("../Model/dbconfig");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("register hit");
  try {
    const res = await connection.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.log("userExists : " + res);

    // console.log("userExists : "+ userExists)
    if (res.rows[0]) {
      return res.json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await connection.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    res.json({ message: "User registered!", user: newUser });
  } catch (error) {
    res.json({ message: "Server error " + error });
  }
};

const findUserId = async (id,req,res) => {
  console.log("sdsf" +id)
const func = async () => {
    id = id;
    try {
      const queryText = "SELECT * FROM users WHERE id = $1";
      const  data= await connection.query(queryText, [id]);
      if (data.length === 0) {
        return res.send({ message: "User not found" });
      }
      
      const user = data.rows[0];
      user.password = null
      console.log("rows" + JSON.stringify(data.rows[0]))
      res.send(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.send({ message: "Server error" });
    }
  };
func();
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the database to find the user by email
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await connection.query(query, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Set the token in a HTTP-only cookie for security
    res.cookie("token", token, { httpOnly: true });

    // Send a success response with a message
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ message: "Server error" + error });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  findUserId
};
