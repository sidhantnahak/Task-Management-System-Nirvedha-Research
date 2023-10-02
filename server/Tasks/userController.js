const User = require('./userSchema');
const bcryptjs = require('bcryptjs');
const sendToken = require('./sendToken');
const { validationResult } = require('express-validator');
const express = require("express");
const { RegisterDataValidation, LoginDataValidation } = require('./task_user.validation');
const { route } = require('./TaskController');
const { isAuthenticated } = require('./isAuth');
const router = express.Router();

//Register user

router.post("/signup", RegisterDataValidation, async (req, res) => {

  try {
    const { email, name, phone, password } = req.body;



    if (!email || !name || !phone || !password) {
      return res.status(401).json({ message: "enter required fields", sucess: false })
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg, sucess: false })

    }

    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(404).json({ message: "user already exist", sucess: false })
    }

    user = await User.create({ name, email, phone, password })
    sendToken(user, 201, res);

  } catch (error) {

    return res.status(500).json({ message: error.message, sucess: false })

  }


})



//Login user

router.post("/login", LoginDataValidation, async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "enter required fields", sucess: false })
  }
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, sucess: false })

  }
  try {

    let user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(400).json({ message: "user not found", sucess: false })
    }

    let compare_password = await bcryptjs.compare(password, user.password)
    if (!compare_password) {
      return res.status(400).json({ message: "enter valid password with email", sucess: false })

    }

    sendToken(user, 201, res);

  } catch (error) {
    return res.status(500).json({ message: error.message, sucess: false })
  }

})


//Logout user

router.get("/logout", isAuthenticated, async (req, res) => {

  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true
    })

    return res.status(200).json({ sucess: true, message: "Logged out sucessfully" })

  } catch (error) {
    return res.status(500).json({ message: error.message, sucess: false })
  }


})


//Get User

router.post("/me", isAuthenticated, async (req, res) => {

  try {
  const userId = req.id;

    const user = await User.findById(userId).select("-password");
    return res.status(200).json({ user, sucess: true });

  } catch (error) {
    return res.status(401).json({ message: error.message, sucess: false })

  }
})

module.exports=router
