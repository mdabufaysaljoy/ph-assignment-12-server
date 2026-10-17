const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
    },
    companyLogo: {
      type: String,
    },
    packages: {
      type: String,
    },
    role: {
      required: true,
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
  
  },
  {
    timestamps: true,
  },
);

module.exports = userSchema;
