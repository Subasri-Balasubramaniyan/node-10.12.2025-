// scripts/index_test.js
const mongoose = require("mongoose");
const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

async function indexTest() {
  try {
    // 1️⃣ Connect to DB
    await mongoose.connect("mongodb://127.0.0.1:27017/phase7");
    console.log("Connected");

    // 2️⃣ Drop existing indexes to start fresh
    await Enrollment.collection.dropIndexes().catch(err => {
      if (err.codeName !== "NamespaceNotFound") console.error(err);
    });
    console.log("Indexes dropped (if any)");

    // 3️⃣ Create unique index on Enrollment (student + course)
    await Enrollment.collection.createIndex(
      { student: 1, course: 1 },
      { unique: true }
    );
    console.log("Indexes created");

    // 4️⃣ Test data (replace with actual IDs from your DB)
    const testCourseId = "69399c307a429817caf4d191"; // Example course ObjectId
    const testStudentId = "69399c307a429817caf4cdb2"; // Example student ObjectId

    console.log("Testing course:", testCourseId);

    // 5️⃣ Fetch enrollments without populate
    const enrollmentsNoPopulate = await Enrollment.find({ course: testCourseId });
    console.log("find-enrollments-no-populate:", enrollmentsNoPopulate.length, "documents");

    // 6️⃣ Fetch enrollments WITH population
    const enrollmentsPopulated = await Enrollment.find({ course: testCourseId })
      .populate("student")  // User model must be loaded before this
      .populate("course");  // Course model must be loaded before this

    console.log("find-enrollments-populated:", enrollmentsPopulated.length, "documents");

    // Optional: log first populated enrollment
    if (enrollmentsPopulated.length > 0) {
      console.log("First populated enrollment:", enrollmentsPopulated[0]);
    }

  } catch (err) {
    console.error("Error in index test:", err);
  } finally {
    await mongoose.disconnect();
    console.log("DB Disconnected");
  }
}

// Run the test
indexTest();
