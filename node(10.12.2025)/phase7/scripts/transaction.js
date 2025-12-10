// scripts/transaction.js
const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

async function transactionExample(studentId, courseId) {
  await mongoose.connect("mongodb://127.0.0.1:27017/phase7");
  console.log("DB Connected for Transaction Test");

  try {
    console.log("\nSimulating Transaction...");

    // Step 1: Insert enrollment
    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      progress: 0,
    });
    console.log("Enrollment inserted:", enrollment._id);

    // Step 2: Update course count
    const courseUpdate = await Course.updateOne(
      { _id: courseId },
      { $inc: { enrolleeCount: 1 } }
    );
    console.log("Course updated:", courseUpdate.modifiedCount);

    console.log("Simulated transaction completed ✅");
  } catch (err) {
    console.log("Error during simulated transaction:", err.message);
    // Manual rollback can be implemented here if needed
  } finally {
    await mongoose.disconnect();
    console.log("DB Disconnected");
  }
}

// Replace with your actual IDs
const studentId = "676f9d2fdde345a5a12c1abc";
const courseId = "676f9d93dde345a5a12c1def";

transactionExample(studentId, courseId).catch(console.error);
