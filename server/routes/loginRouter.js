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
                req.worksAt = user.worksAt;
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
        const { username, role, worksAt } = req.user;
        return res.json({ username, role, worksAt });
    });

    login.post("/", async (req, res) => {
        const { username, password } = req.body;  //The posts request body returns with the username and password
        const user = await Users.findOne({ username, password });
     
        if (!user) {
            return res.sendStatus(401);
        }
        res.cookie("username", user.username, {signed: true});
        res.cookie("role", user.role, {signed: true});
        res.cookie("worksAt", user.worksAt, {signed: true});
        res.sendStatus(200);
    });

    login.delete("/", (req, res) => {
        res.clearCookie("username");
        res.clearCookie("role");
        res.clearCookie("worksAt");
        res.sendStatus(204);
    });

    return login;
}

module.exports = {
    requestUser,
    createLoginRouter
};