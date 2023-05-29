/** @format */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const error = require("../utils/error");
const { findUserByProperty, createNewUser } = require("./user");

const register_service = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Invalid Data" });
    }

    let user = await findUserByProperty("email", email);
    if (user) throw error("User already exist", 400);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return await createNewUser({ name, email, password: hash });
};

const login_service = async ({ email, password }) => {
    let user = await findUserByProperty("email", email);

    if (!user) throw error("Invalid Credential", 400);

    const is_match = await bcrypt.compare(password, user.password);
    if (!is_match) throw error("Invalid Credential", 400);

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        accounStatus: user.accounStatus,
    };

    return jwt.sign(payload, "secret_key", { expiresIn: "12h" });
};

module.exports = {
    register_service,
    login_service,
};
