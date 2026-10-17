const { model } = require("mongoose");
const userSchema = require("../schema/user.schema");

const User = model("User", userSchema);

module.exports = User;
