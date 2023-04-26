import React from "react";
import {fetchJSON, postJSON, putJSON} from "./http.js";

export const Usercontext = React.createContext({

    async loginUser(user) {
        return await postJSON("/api/login/", user);
    },
    async createUser(user) {
        return await postJSON("/api/admin/new", user);
    },
    async getUsers() {
        return await fetchJSON("/api/admin/");
    },
    async updateUser(user) {
        return await putJSON("/api/admin/", user);
    },
});