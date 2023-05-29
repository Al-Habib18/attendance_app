/** @format */

const mongoose = require("mongoose");

function connect_db(connecion_string) {
    return mongoose.connect(connecion_string);
}

module.exports = connect_db;
