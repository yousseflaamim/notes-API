//validator.js

const Joi = require("joi");

const noteSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  text: Joi.string().min(3).max(300).required()
});


module.exports.validateNoteInput = (data) => {
  const { error } = noteSchema.validate(data);
  if (error) return error.message;
  return null;
};


module.exports.validateLogin = (data) => {
  if (!data.email) return "Email is required";
  if (!data.password) return "Password is required";
  return null;
};


module.exports.validateSignup = (data) => {
  if (!data.email) return "Email is required";
  if (!data.password || data.password.length < 6) return "Password must be at least 6 characters";
  return null;
};

