const User = require("../models/user.model");

const verifyManager = async (req, res, next) => {
  const email = req.decoded?.email;
  const user = await User.findOne({ email });
  const isManager = user?.role === "manager";
  if (!isManager) {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};

module.exports = verifyManager;
 