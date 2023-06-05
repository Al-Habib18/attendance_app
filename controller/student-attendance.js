/** @format */

const { addMinutes, isAfter } = require("date-fns");
const error = require("../utils/error");
const AdminAttendance = require("../models/AdminAttendance");

const StudentAttendance = require("../models/StudentAttendance");

const getAttendance = async (req, res, next) => {
    const { id } = req.params;
    try {
        const adminAttendance = await AdminAttendance.findById(id);

        if (!adminAttendance) {
            throw error("Invalid attendance id: ", 400);
        }

        if (adminAttendance.stutus === "COMPLETEd") {
            throw error("Attendance Already completed");
        }

        let attendance = await StudentAttendance.findOne({
            admin_attendance: id,
            user: req.user._id,
        });

        if (attendance) {
            throw error("Attendance Already completed");
        }

        attendance = new StudentAttendance({
            user: req.user._id,
            admin_attendance: id,
        });

        await attendance.save();

        return res.status(201).json(attendance);
    } catch (err) {
        next(err);
    }
};

const getAttendanceStatus = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: "RUNNING" });
        if (!running) {
            throw error("Not running", 400);
        }

        const started = addMinutes(
            new Date(running.createdAt),
            running.timeLime
        );

        if (isAfter(new Date(), started)) {
            running.status = "COMPLETED";
            await running.save();
        }

        return res.status(201).json(running);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAttendance,
    getAttendanceStatus,
};
