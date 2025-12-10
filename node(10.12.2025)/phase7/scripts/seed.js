const mongoose = require("mongoose");
const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

// Generate random names
const randomName = () => "User" + Math.floor(Math.random() * 100000);
const randomEmail = () => "user" + Math.floor(Math.random() * 100000) + "@gmail.com";

async function seed() {
  try {
    // FIXED MONGOOSE CONNECTION
    await mongoose.connect("mongodb://127.0.0.1:27017/phase7");
    console.log("DB Connected");

    // Delete old data
    await User.deleteMany();
    await Course.deleteMany();
    await Enrollment.deleteMany();

    console.log("Old data cleared.");

    // Insert 1000 students
    const students = [];
    for (let i = 0; i < 1000; i++) {
      students.push({
        name: randomName(),
        email: randomEmail(),
        role: "student",
      });
    }
    const studentDocs = await User.insertMany(students);
    console.log("Inserted 1000 students.");

    // Insert 50 courses
    const courses = [];
    for (let i = 0; i < 50; i++) {
      courses.push({
        title: "Course " + i,
        category: "Category " + i,
        lessons: [
          { title: "Intro", duration: 10 },
          { title: "Advanced", duration: 20 },
        ],
        instructor: studentDocs[Math.floor(Math.random() * 1000)]._id,
      });
    }
    const courseDocs = await Course.insertMany(courses);
    console.log("Inserted 50 courses.");

    // Insert enrollments randomly
    const enrollments = [];
    for (let i = 0; i < 2000; i++) {
      enrollments.push({
        student: studentDocs[Math.floor(Math.random() * 1000)]._id,
        course: courseDocs[Math.floor(Math.random() * 50)]._id,
        progress: Math.floor(Math.random() * 100),
      });
    }
    await Enrollment.insertMany(enrollments);

    console.log("Inserted 2000 enrollments.");

    mongoose.connection.close();
    console.log("Seeding completed.");

  } catch (err) {
    console.error(err);
  }
}

seed();
