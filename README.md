Project Overview

This project demonstrates advanced MongoDB concepts including relationships, population, embedding vs referencing, cascading operations, transactions, and scaling. It is divided into two phases:

Phase 6 — Relationships: Focused on structuring documents and managing relationships.

Phase 7 — Scaling & Transactions: Focused on handling large datasets, performance optimization, and multi-document transactions.

Phase 6 — Relationships

Objective: Learn when to embed, reference, and use populate() effectively.

Key Concepts Covered

Embedding vs referencing

Many-to-many relationships

Populating referenced documents

Cascading delete & update

Virtual fields

Shallow vs deep population

Tasks Implemented

Many-to-many relationship between students and courses via an Enrollment collection.

Fetch courses with enrolled students using populate().

Fetch student progress for all courses using nested populate().

Compare performance: populate() vs separate queries.

Implement cascading delete: deleting a course removes related enrollments.

Implement cascading update: updating course instructor updates related data.

Demonstrate difference between shallow and deep population.

Added a virtual field to calculate completion percentage per course.

Mixed embedding and referencing:

Lessons embedded in course documents

Enrollments referenced

Documented trade-offs and reasoning for schema design decisions.

Outcome: Understanding when to embed, when to reference, and how to structure relationships in MongoDB for maintainability and performance.

Phase 7 — Scaling & Transactions

Objective: Learn MongoDB limitations, scaling strategies, and multi-document transactions.

Key Concepts Covered

Performance with large datasets

Transactions for atomic operations

Sharding and indexing

Query optimization

Scaling considerations for real-world applications

Tasks Implemented

Inserted 1000+ fake students and 50+ courses for performance testing.

Queried courses with students and logged performance metrics.

Implemented a transaction for enrolling a student and updating course enrollment atomically.

Simulated failed transactions to observe rollback behavior.

Compared read/write performance for small vs large datasets.

Experimented with shard key selection (for Atlas sharding scenarios).

Analyzed slow queries and proposed schema redesigns.

Split large collections and measured performance impact.

Tested indexing impact under high load.

Documented MongoDB scaling limits and best practices.

Outcome: Understanding how MongoDB scales, when transactions are necessary, and how schema design affects performance in large datasets.

Folder Structure Example
phase6-7/
│
├─ models/
│   ├─ User.js
│   ├─ Course.js
│   ├─ Lesson.js
│   ├─ Enrollment.js
│
├─ controllers/
│   ├─ courseController.js
│   ├─ enrollmentController.js
│   ├─ studentController.js
│
├─ routes/
│   ├─ courseRoutes.js
│   ├─ enrollmentRoutes.js
│   └─ studentRoutes.js
│
├─ scripts/
│   ├─ seedStudents.js
│   ├─ seedCourses.js
│
├─ app.js
└─ README.md

Setup & Run Instructions

Clone the repository:

git clone <repo_url>
cd phase6-7


Install dependencies:

npm install


Configure .env for MongoDB:

DB_ENV=local
LOCAL_URI=mongodb://127.0.0.1:27017/mongo_phase6_7


Seed the database (optional):

node scripts/seedStudents.js
node scripts/seedCourses.js


Start the application:

node app.js


Test APIs using Postman:

/courses → fetch courses with populated students

/enrollments → create or delete enrollments

/students/:id/progress → fetch student progress

Performance & Observations

Populate vs separate queries: populate() is convenient but can be slower for large datasets.

Cascading operations: Essential to maintain referential integrity in MongoDB.

Transactions: Critical when performing multi-document writes to prevent partial updates.

Indexing: Drastically improves query performance for large collections.

Sharding: Enables horizontal scaling for very large datasets.

References & Further Reading

MongoDB Relationships

Mongoose Population

MongoDB Transactions

MongoDB Sharding
