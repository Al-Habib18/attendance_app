/** @format */

const router = require("express").Router();

const auth_routes = require("./auth");
const user_routes = require("./user");
const authenticate = require("../middleware/authenticate");
const AdminAttendanceRoute = require("./admin-attendance");
const StudentAttendanceRoute = require("./student-attendance");

router.use("/api/v1/auth", auth_routes);
router.use("/api/v1/users", authenticate, user_routes);
router.use("/api/v1/admin/attendance", authenticate, AdminAttendanceRoute);
router.use("/api/v1/student/attendance", authenticate, StudentAttendanceRoute);

module.exports = router;
