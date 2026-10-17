const User = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      dateOfBirth,
      companyName,
      companyLogo,
      packages,
      role,
    } = req.body;
    // console.log(req.body);
    const checkUser = await User.find({ email });
    if (checkUser.length) {
      res.status(203).json({
        success: true,
        message: "Signup Success",
      });
    } else {
      const user = await User.create({
        name,
        email,
        dateOfBirth,
        companyName,
        companyLogo,
        packages,
        role: role?.toLowerCase() || "employee", // Normalize role to lowercase
      });
      res.status(201).json({
        success: true,
        data: user,
        message: "user created success",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getUsers,
  createUser,
};
