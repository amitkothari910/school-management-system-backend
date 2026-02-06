const Class = require("./Class");
const Subject = require("./Subject");
const Teacher = require("./Teacher");
const Student = require("./Student");
const Timetable = require("./Timetable");
const Attendance = require("./Attendance");
const Exam = require("./Exam");
const Result = require("./Result");

// =========================
// SUBJECT ASSOCIATIONS
// =========================
Class.hasMany(Subject);
Subject.belongsTo(Class);

Teacher.hasMany(Subject);
Subject.belongsTo(Teacher);

// =========================
// TIMETABLE ASSOCIATIONS
// =========================
Class.hasMany(Timetable);
Timetable.belongsTo(Class);

Teacher.hasMany(Timetable);
Timetable.belongsTo(Teacher);

Subject.hasMany(Timetable);
Timetable.belongsTo(Subject);

// =========================
// ATTENDANCE ASSOCIATIONS
// =========================
Student.hasMany(Attendance);
Attendance.belongsTo(Student);

Class.hasMany(Attendance);
Attendance.belongsTo(Class);

Subject.hasMany(Attendance);
Attendance.belongsTo(Subject);

Teacher.hasMany(Attendance);
Attendance.belongsTo(Teacher);

// =========================
// EXAM & RESULT ASSOCIATIONS
// =========================
Class.hasMany(Exam);
Exam.belongsTo(Class);

Exam.hasMany(Result);
Result.belongsTo(Exam);

Student.hasMany(Result);
Result.belongsTo(Student);

Subject.hasMany(Result);
Result.belongsTo(Subject);

Teacher.hasMany(Result);
Result.belongsTo(Teacher);

module.exports = {
  Class,
  Subject,
  Teacher,
  Student,
  Timetable,
  Attendance,
  Exam,
  Result,
};
