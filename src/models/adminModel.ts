//This handles the schema for the user biodatas

//Libraries -->
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const validator = require("validator");

//Commencing the app
const Schema = mongoose.Schema;
ADMIN_EMAIL = process.env.ADMIN_EMAIL;
ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

//This is the schema for the user database
const adminSchema = new Schema(
  {
    emailAddress: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

//Static create admin method
adminSchema.statics.createAdmin = async function () {
  const salt = await bcrypt.genSalt(10);

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);
  if (!validator.isEmail(ADMIN_EMAIL)) {
    throw Error("Email not valid");
  }
  const emailAddress = ADMIN_EMAIL;
  const password = passwordHash;
  const admin = await this.create({
    emailAddress,
    password,
  });
  return admin;
};

//Static login method
adminSchema.statics.login = async function (emailAddress, password) {
  //Validation of args
  if (!emailAddress) {
    throw Error("Email is required");
  } else if (!password) {
    throw Error("Password is required");
  } else if (!validator.isEmail(emailAddress)) {
    throw Error("Email not valid");
  }

  //Processing the login process
  const admin = await this.findOne({ emailAddress });
  if (!admin) {
    throw Error("Incorrect email");
  }

  const passwordStatus = await bcrypt.compare(password, admin.password);
  if (!passwordStatus) {
    throw Error("Incorrect password");
  }

  return admin;
};

//Static update method
adminSchema.statics.updateAdmin = async (emailAddress, password) => {
  //Validation of args
  if (!emailAddress) {
    throw Error("Email is required");
  } else if (!password) {
    throw Error("Password is required");
  } else if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }

  //Processing the login process
  const admin = await this.findOne({ emailAddress });
  if (!admin) {
    throw Error("Email doesn't exist");
  }

  //Updating the admin
  const newAdmin = await task.findOneAndUpdate(
    { emailAddress: emailAddress },
    { ...req.body }
  );

  return newAdmin;
};

//Static delete method
adminSchema.statics.deleteAdmin = async () => {};

module.exports = mongoose.model("Admin", adminSchema);
