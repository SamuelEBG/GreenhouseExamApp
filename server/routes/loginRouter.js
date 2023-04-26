const express = require('express');
const Users = require("../models/userModels.js");

function requestUser() {
    return async (req, res, next) => {
        const {username} = req.signedCookies;
        if (username) {
            const user = await Users.findOne({ username });
            if (user) {
                req.user = user;
                req.role = user.role;
            }
        }
        next();
    };
}

function createLoginRouter() {
    const login = express.Router();
    login.get("/", async (req, res) => {
        if (!req.user) {
            return res.sendStatus(204);
        }
        const { username, role } = req.user;
        return res.json({ username, role });
    });

    login.post("/", async (req, res) => {
        const { username, password } = req.body;  //The posts request body returns with the username and password
        const user = await Users.findOne({ username, password });
        /*
        const usersFromDb = userSchema
                .find()
                .toArray();
        const user = usersFromDb.find(
            (user) => user.username === username && user.password === password
        );
        */
        if (!user) {
            return res.sendStatus(401);
        }
        res.cookie("username", user.username, {signed: true});
        res.cookie("role", user.role, {signed: true});
        res.sendStatus(200);
    });

    login.delete("/", (req, res) => {
        res.clearCookie("username");
        res.clearCookie("role");
        res.sendStatus(204);
    });

    return login;
}

module.exports = {
    requestUser,
    createLoginRouter
};