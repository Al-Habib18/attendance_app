/** @format */

const { model, Schema } = require("mongoose");

const user_schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) {
                    return true;
                }

                alert("You have entered an invalid email address!");
                return false;
            },
        },
    },
    password: {
        type: String,
        minlength: [6, "password is too short"],
        required: true,
    },
    roles: {
        type: [String],
        required: true,
        default: ["STUDENT"],
    },
    account_status: {
        type: String,
        enum: ["PENDING", "ACTIVE", "REJECTED"],
        default: "PENDING",
        required: true,
    },
});

const User = model("User", user_schema);

module.exports = User;
