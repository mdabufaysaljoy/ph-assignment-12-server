const router = require("express").Router();
const { createUser, getUsers } = require("../controllers/user.controller");
const verifyManager = require("../middlewares/verifyManager");
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/user.model");

//? user create
router.post("/register", createUser);

//? user login
router.post("/login",  async (req, res) => {
  const email = req.body?.email;
  console.log(email);
  try {
    if (email) {
      const user = await User.findOne({ email });
      res.send({ success: true, user });
    }
  } catch (error) {
    res.status(401).send({ message: "forbidden access", success: false });
  }
});

//? get users
router.get("/", verifyToken, verifyManager, getUsers);


//? for useUsers hook
router.get("/:email", verifyToken, async (req, res) => {
  const email = req.params.email;
  try {
    if (req.decoded?.email === email) {
      const user = await User.findOne({ email });
      // console.log(user);
      return res.status(200).send({ user, success: true });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
  // console.log(email);
});

//? user is employee check
router.get("/isEmployee/:email", verifyToken, async (req, res) => {
  const email = req.params.email;
  if (!email) {
    return res
      .status(404)
      .send({ employee: false, message: "User Not Logged In" });
  }
  // console.log(email,req.decoded.email)
  if (email !== req.decoded?.email) {
    return res.status(403).send({ message: "forbidden access" });
  }
  try {
    const user = await User.findOne({ email });
    // console.log(user.role==="employee")
    const employee = user?.role?.toLowerCase() === "employee";
    res.status(200).send({ employee });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Server error", employee: false });
  }
});

//? user is manager check
router.get("/isManager/:email", verifyToken, async (req, res) => {
  const email = req.params.email;
  if (!email) {
    return res.status(404).send({ message: "User Not Logged In" });
  }
  if (email !== req.decoded?.email) {
    return res.status(403).send({ message: "forbidden access" });
  }
  try {
    const user = await User.findOne({ email });
    const manager = user?.role?.toLowerCase() === "manager";
    res.status(200).send({ manager });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Server error", manager: false });
  }
});

module.exports = router;
