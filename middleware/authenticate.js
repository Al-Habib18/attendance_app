/** @format */

const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authenticate(req, res, next) {
    // give a protection
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        token = token.split(" ")[1];
        const decoded = jwt.verify(token, "secret_key");

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "unauthorized" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res
            .status(400)
            .json({ message: "Invalid token in authorization" });
    }
}

module.exports = authenticate;
