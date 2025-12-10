const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");
const User = require("../models/User");      // FIX ADDED
const Course = require("../models/Course");  // FIX ADDED

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/phase7");
  console.log("Connected");

  const randomCourse = await Course.findOne();
  console.log("Testing course:", randomCourse._id);

  // ------------------------------
  // 1. Find enrollments without populate
  // ------------------------------
  console.time("find-enrollments-no-populate");
  const enrollmentsNoPop = await Enrollment.find({ course: randomCourse._id });
  console.timeEnd("find-enrollments-no-populate");
  console.log("count:", enrollmentsNoPop.length);

  // ------------------------------
  // 2. Find with populate (student + course)
  // ------------------------------
  console.time("find-enrollments-populate");
  const enrollmentsPop = await Enrollment.find({ course: randomCourse._id })
    .populate("student")      // Uses User model (needs import)
    .populate("course");      // Uses Course model (needs import)
  console.timeEnd("find-enrollments-populate");

  console.log("Done");
  mongoose.connection.close();
}

main();
