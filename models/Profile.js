/** @format */

const { model, mongoose, Schema } = require("mongoose");

const profile_schema = new Schema({
    first_name: String,
    last_name: String,
    phone: String,
    avatar: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Profile = model("Profile", profile_schema);
module.exports = Profile;
