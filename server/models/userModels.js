const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String,
});

module.exports = mongoose.model("Users", userSchema, "users");