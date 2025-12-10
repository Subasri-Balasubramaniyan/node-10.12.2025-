const mongoose = require("mongoose");
const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  course:  { type: mongoose.Schema.Types.ObjectId, ref: "Course", index: true },
  progress: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Enrollment", enrollmentSchema);
