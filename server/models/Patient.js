const mongoose = require("mongoose");
const Joi = require("joi");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// validate patient data
exports.patientValidationSchema = (patient) => {
  const schema = Joi.object({
    name: Joi.string().required("Name is required"),
    age: Joi.number().required("Age is required"),
    contactNumber: Joi.string().required("Contact number is required"),
  });
  return schema.validate(patient);
};

const Patient = mongoose.model("Patient", patientSchema);

module.exports = { Patient, patientValidationSchema };
