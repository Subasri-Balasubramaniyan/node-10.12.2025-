const mongoose = require("mongoose");
const User = require("./models/User");
const Course = require("./models/Course");
const Enrollment = require("./models/Enrollment");

(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/phase6");
  console.log("DB Connected");

  // ================================
  // 1. Create Instructor
  // ================================
  const instructor = await User.create({
    name: "Rahul",
    email: "rahul@gmail.com",
    role: "instructor"
  });

  // ================================
  // 2. Create Course with Embedded Lessons
  // ================================
  const course = await Course.create({
    title: "Node JS",
    category: "Programming",
    lessons: [
      { title: "Intro", duration: 10 },
      { title: "API", duration: 15 }
    ],
    instructor: instructor._id
  });

  // ================================
  // 3. Create Student
  // ================================
  const student = await User.create({
    name: "Suba",
    email: "suba@gmail.com",
    role: "student"
  });

  // ================================
  // 4. Many-to-Many → Enrollment
  // ================================
  await Enrollment.create({
    student: student._id,
    course: course._id,
    progress: 50
  });

  console.log("\n--- Many-to-Many Relationship Created ---\n");


  // ================================
  // 5. Populate → Find Course with Students
  // ================================
  const enrolledStudents = await Enrollment.find({ course: course._id })
    .populate("student", "name email");

  console.log("Course Students:", enrolledStudents);


  // ================================
  // 6. Nested Populate (Deep)
  // ================================
  const deep = await Enrollment.find()
    .populate("student")
    .populate({
      path: "course",
      populate: { path: "instructor", select: "name email" }
    });

  console.log("\nDeep Populate Result:\n", deep);

})();
