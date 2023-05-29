/** @format */

const { Schema, model } = require("mongoose");

const student_attendance_schema = new Schema({
    created_at: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    admin_attendance: {
        type: Schema.Types.ObjectId,
        ref: "admin_attendance",
    },
});

const student_attendance = model(
    "student_attendance",
    student_attendance_schema
);

module.exports = student_attendance;
