const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, index: true }, // index helpful at scale
  role: { type: String, enum: ["student","instructor"], default: "student" }
});
module.exports = mongoose.model("User", userSchema);
