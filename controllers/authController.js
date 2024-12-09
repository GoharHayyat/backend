const bcrypt = require("bcrypt");
const User = require("../db/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function register(req, res, next) {
  const {  email, password } = req.body;
  
  try {
    const user = await User.create({
      email,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Please provide both Email and Password",
    });
  }
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Invalid Credentials",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).json({
        success: false,
        error: "Invalid Credentials!",
      });
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
    data: user,
  });
};
module.exports = { register, login };
