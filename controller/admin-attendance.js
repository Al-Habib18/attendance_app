/** @format */
const { addMinutes, isAfter } = require("date-fns");
const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");

const getEnable = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: "RUNNING" });
        if (running) throw error("Already running", 400);

        const attendace = new AdminAttendance({ timeLime: 1 });
        await attendace.save();
        return res.status(201).json({ message: "Success", attendace });
    } catch (e) {
        next(e);
    }
};
const getStatus = async (req, res, next) => {
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
const getDisable = async (req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: "RUNNING" });
        if (!running) {
            throw error("Not running", 400);
        }

        running.status = "COMPLETED";
        await running.save();

        return res.status(201).json(running);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getEnable,
    getDisable,
    getStatus,
};
