import React from "react";
import { fetchJSON } from "./http.js";

export const ReadingsContext = React.createContext({

    async listTemperature() {
        return await fetchJSON("api/temperature");
    },
    async listHumidity() {
        return await fetchJSON("api/humidity");
    },
    async listSunlight() {
        return await fetchJSON("api/sunlight");
    },
    async fetchLogin() {
      return await fetchJSON("/api/login");
    },
    async logInUser(user) {
      return await postJSON("/api/login/", user);
    },
    async createUser(user) {
      return await postJSON("/api/login/new", user);
    },
    async listTemperatureById(id) {
      return await fetchJSON(`api/temperature/${id}`);
    },
    async listHumidityById(id) {
      return await fetchJSON(`api/humidity/${id}`);
    },
    async listSunlightById(id) {
      return await fetchJSON(`api/sunlight/${id}`);
    },
    async listGreenhouses() {
      return await fetchJSON(`api/greenhouses`);
    },
})

/*
export function ReadingsProvider({ children }) {
  async function listTemperature() {
    return await fetchJSON("api/temperature");
  }

  async function listHumidity() {
    return await fetchJSON("api/humidity");
  }

  async function listSunlight() {
    return await fetchJSON("api/sunlight");
  }

  const contextValue = {
    listTemperature,
    listHumidity,
    listSunlight
  };

  return (
    <ReadingsContext.Provider value={contextValue}>
      {children}
    </ReadingsContext.Provider>
  );
}
*/