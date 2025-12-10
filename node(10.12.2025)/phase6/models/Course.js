const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: String,
  duration: Number
});

const courseSchema = new mongoose.Schema({
  title: String,
  category: String,
  lessons: [lessonSchema],   // Embedded documents

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"              // Reference
  }
});

module.exports = mongoose.model("Course", courseSchema);
