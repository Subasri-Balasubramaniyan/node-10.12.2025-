// scripts/transaction_fail.js
const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

async function transactionFail(studentId, courseId) {
  await mongoose.connect("mongodb://127.0.0.1:27017/phase7");
  console.log("DB Connected for Simulated Transaction Fail Test");

  try {
    console.log("\nSimulating Transaction with Failure...");

    // Step 1: Insert enrollment
    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      progress: 0,
    });
    console.log("Enrollment inserted:", enrollment._id);

    // Step 2: Simulate crash
    throw new Error("Simulated crash — manual rollback required");

    // Step 3: Update course (won't run)
    await Course.updateOne({ _id: courseId }, { $inc: { enrolleeCount: 1 } });
  } catch (err) {
    console.log("Caught Error:", err.message);
    console.log(
      "Manual rollback can be implemented here: delete the enrollment if needed"
    );

    // Example manual rollback:
    await Enrollment.deleteOne({ student: studentId, course: courseId });
    console.log("Manual rollback: enrollment deleted ✅");
  } finally {
    await mongoose.disconnect();
    console.log("DB Disconnected");
  }
}

// Replace with your actual IDs
const studentId = "676f9d2fdde345a5a12c1abc";
const courseId = "676f9d93dde345a5a12c1def";

transactionFail(studentId, courseId).catch(console.error);
