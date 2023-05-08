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

// create a TTL index on the modifiedDate field that expires documents after 27 hours
// 27 hours x 60 minutes x 60 seconds == 97200
// 60 seconds x 5 minutes = 300
temperatureSchema.index({ modifiedDate: 1 }, { expireAfterSeconds: 30000 });
humiditySchema.index({ modifiedDate: 1 }, { expireAfterSeconds: 30000 });
sunlightSchema.index({ modifiedDate: 1 }, { expireAfterSeconds: 30000 });

//module.exports.TemperatureModel = mongoose.model("TemperatureModel", temperatureSchema, "temperature");
//module.exports.HumidityModel = mongoose.model("HumidityModel", humiditySchema, "humidity");
//module.exports.SunlightModel = mongoose.model("SunlightModel", sunlightSchema, "sunlight");

const TemperatureModel = mongoose.model("TemperatureModel", temperatureSchema, "temperature");
const HumidityModel = mongoose.model("HumidityModel", humiditySchema, "humidity");
const SunlightModel = mongoose.model("SunlightModel", sunlightSchema, "sunlight");

module.exports = { TemperatureModel, HumidityModel, SunlightModel };