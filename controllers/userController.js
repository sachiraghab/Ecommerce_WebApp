const User = require('./../models/userModel');
const bcrypt = require('bcryptjs');

//user register
const registerController = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    //hashing password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ email, username, password: hashedPassword });
    await user.save().then(() => {
      res.status(200).json({ message: "User registered successfully", status: "success" });
    });
  } catch (error) {
    res.status(400).json({ message: "user already exists", status: "error" });    
  }
}

//user login
const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: "Please register first", status:"error" });
      return;
    }
    const isMatch = bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "incorrect password", status:"error" });
      return;
    }
    const { password, ...data } = user._doc;
    res.status(200).json({ data, status:"success", message:"Login successful" });    
  } catch (error) {
    res.status(500).send({ message: "Login error", status:"error" });    
  }
}

module.exports = { registerController, loginController };