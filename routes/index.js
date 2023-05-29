/** @format */

const router = require("express").Router();

const auth_routes = require("./auth");
router.use("/api/v1/auth", auth_routes);

module.exports = router;
