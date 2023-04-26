const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
/**
 * Import each model in their respective routes to access the
 * relevant data for that route.
 */

const temperatureSchema = mongoose.Schema({
    greenhouseId: String,
    temperature: Number,
    modifiedDate: {type:Date, default: Date.now}
}, { versionKey: false });

const humiditySchema = mongoose.Schema({
    greenhouseId: String,
    humidity: Number,
    modifiedDate: {type:Date, default: Date.now}
}, { versionKey: false });

const sunlightSchema = mongoose.Schema({
    greenhouseId: String,
    sunlight: Number,
    modifiedDate: {type:Date, default: Date.now}
}, { versionKey: false });

//module.exports.TemperatureModel = mongoose.model("TemperatureModel", temperatureSchema, "temperature");
//module.exports.HumidityModel = mongoose.model("HumidityModel", humiditySchema, "humidity");
//module.exports.SunlightModel = mongoose.model("SunlightModel", sunlightSchema, "sunlight");

const TemperatureModel = mongoose.model("TemperatureModel", temperatureSchema, "temperature");
const HumidityModel = mongoose.model("HumidityModel", humiditySchema, "humidity");
const SunlightModel = mongoose.model("SunlightModel", sunlightSchema, "sunlight");

module.exports = { TemperatureModel, HumidityModel, SunlightModel };