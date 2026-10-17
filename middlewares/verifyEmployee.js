const User = require("../models/user.model");

const verifyEmployee = async (req, res, next) => {
  const email = req.decoded?.email;
  const user = await User.findOne({ email });
  const isEmployee = user?.role === "employee";
  if (!isEmployee) {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};

module.exports = verifyEmployee;
