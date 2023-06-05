/** @format */
const User = require("../models/User");

const findUser = () => {
    return User.find();
};

const findUserByProperty = (key, value) => {
    if (key === "_id") {
        return User.findById(value);
    }

    return User.findOne({ [key]: value });
};

const createNewUser = ({ name, email, password, roles, account_status }) => {
    const user = new User({
        name,
        email,
        password,
        roles: roles ? roles : ["STUDENT"],
        account_status: account_status ? account_status : "PENDING",
    });
    return user.save();
};

const deleteUser = (id) => {
    return User.findOneAndDelete(id);
};

const updateUser = async (id, data) => {
    const user = await findUserByProperty("email", data.email);
    if (user) throw error("Email already exists", 400);
    return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

module.exports = {
    findUser,
    findUserByProperty,
    createNewUser,
    deleteUser,
    updateUser,
};
