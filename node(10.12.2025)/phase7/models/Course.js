const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: String,
  duration: Number
});

const courseSchema = new mongoose.Schema({
  title: String,
  category: String,
  lessons: [lessonSchema],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }
  ],
  enrollmentCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Course", courseSchema);
