//validator.js

const Joi = require("joi");

// ملاحظة
const noteSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  text: Joi.string().min(3).max(300).required()
});

// التحقق من صحة ملاحظة
module.exports.validateNoteInput = (data) => {
  const { error } = noteSchema.validate(data);
  if (error) return error.message;
  return null;
};

// تسجيل الدخول
module.exports.validateLogin = (data) => {
  if (!data.email) return "Email is required";
  if (!data.password) return "Password is required";
  return null;
};

// تسجيل مستخدم جديد
module.exports.validateSignup = (data) => {
  if (!data.email) return "Email is required";
  if (!data.password || data.password.length < 6) return "Password must be at least 6 characters";
  return null;
};

