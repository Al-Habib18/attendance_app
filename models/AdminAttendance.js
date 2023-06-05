/** @format */

const { Schema, model } = require("mongoose");

const adminAttendanceSchema = new Schema(
    {
        timeLime: {
            type: Number,
            required: true,
            max: 30,
            min: 1,
            default: 5,
        },
        status: {
            type: String,
            required: true,
            enum: ["RUNNING", "COMPLETED"],
            default: "RUNNING",
        },
        // createdAt: Date,
    },
    { timestamps: true }
);

const AdminAttendance = model("AdminAttendance", adminAttendanceSchema);
module.exports = AdminAttendance;
