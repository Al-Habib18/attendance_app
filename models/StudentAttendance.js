/** @format */

const { Schema, model } = require("mongoose");

const student_attendance_schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        admin_attendance: {
            type: Schema.Types.ObjectId,
            ref: "admin_attendance",
            required: true,
        },
    },
    { timestamps: true }
);

const student_attendance = model(
    "student_attendance",
    student_attendance_schema
);

module.exports = student_attendance;
