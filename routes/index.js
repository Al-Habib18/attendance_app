/** @format */

const router = require("express").Router();

const auth_routes = require("./auth");
const user_routes = require("./user");
const authenticate = require("../middleware/authenticate");

router.use("/api/v1/auth", auth_routes);
router.use("/api/v1/users", authenticate, user_routes);

module.exports = router;
