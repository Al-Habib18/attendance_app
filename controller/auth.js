/** @format */
const { register_service, login_service } = require("../service/auth");

const register_controller = async (req, res, next) => {
    const { name, email, password, roles, account_status } = req.body;

    try {
        const user = await register_service({
            name,
            email,
            password,
            roles,
            account_status,
        });
        return res
            .status(201)
            .json({ message: "User created successfully", user });
    } catch (e) {
        next(e);
    }
};

const login_controller = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        let token = await login_service({ email, password });
        return res.json({ message: "Login successful", token }).status(200);
    } catch (e) {
        next(e);
    }
};

module.exports = { register_controller, login_controller };
