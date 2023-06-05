/** @format */

const User = require("../models/User");
const userServic = require("../service/user");
const authService = require("../service/auth");
const error = require("../utils/error");

const get_user = async (req, res, next) => {
    /**
     *  TODO: filter, sort, paginate, selectproperty
     */

    try {
        let users = await userServic.findUser();

        return res.status(200).json(users);
    } catch (e) {
        next(e);
    }
};

const get_user_by_id = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await userServic.findUserByProperty("_id", userId);

        if (!user) {
            throw error("User not found", 404);
        }

        res.status(200).json(user);
    } catch (e) {
        next(e);
    }
};

const post_user = async (req, res, next) => {
    const { name, email, password, roles, account_status } = req.body;

    try {
        const user = await authService.register_service({
            name,
            email,
            password,
            roles,
            account_status,
        });
        return res.status(200).json(user);
    } catch (e) {
        next(e);
    }
};

const put_user_by_id = async (req, res, next) => {
    const userId = req.params.userId;
    const { name, email, roles, account_status } = req.body;

    try {
        const user = await userServic.updateUser(userId, {
            name,
            email,
            roles,
            account_status,
        });
        if (!user) {
            throw error("User not found", 404);
        }

        await user.save();
        return res.status(200).json(user);
    } catch (e) {
        next(e);
    }
};

const patch_user_by_id = async (req, res, next) => {
    const userId = req.params.userId;
    const { name, roles, account_status } = req.body;

    try {
        const user = await userServic.findUserByProperty("_id", userId);
        if (!user) {
            throw error("User not found", 404);
        }

        user.name = name ?? user.name;
        user.roles = roles ?? user.roles;
        user.account_status = account_status ?? user.account_status;

        await user.save();
        return res.status(200).json(user);
    } catch (e) {
        next(e);
    }
};

const delete_user_by_id = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await userServic.findUserByProperty("_id", userId);
        if (!user) {
            throw error("User not found", 404);
        }

        await userServic.deleteUser(userId);
        // await user.remove();
        return res.status(203).send("User deleted successfully");
    } catch (e) {
        next(e);
    }
};

module.exports = {
    get_user,
    get_user_by_id,
    post_user,
    put_user_by_id,
    patch_user_by_id,
    delete_user_by_id,
};
