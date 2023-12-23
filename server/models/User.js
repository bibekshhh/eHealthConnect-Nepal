const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// validate user data
const userValidationSchema = (user) => {
  const schema = Joi.object({
    fName: Joi.string().required("First name is required"),
    lName: Joi.string().required("Last name is required"),
    email: Joi.string().email().required("Email is required"),
    password: Joi.string().required("Password is required"),
  });

  return schema.validate(user);
};

const validateLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required("Email is required"),
    password: Joi.string().required("Password is required"),
  });

  return schema.validate(user);
};

const User = mongoose.model("user", UserSchema);

module.exports = { User, userValidationSchema, validateLogin };
