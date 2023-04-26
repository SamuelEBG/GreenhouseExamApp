const mqtt = require('mqtt');
const axios = require('axios');
const { TemperatureModel, HumidityModel, SunlightModel } = require("./models/readingsModels");

/**
 * This module listens for messages on our MQTT topic, parses the message data, 
 * saves the readings to our database using our mongoose model, and resets the readings object. 
 * The purpose of this module is to run as a background process that continuously 
 * listens for messages on our MQTT topic, and performs the necessary 
 * actions when a new message is received. 
 */

// Credentials should be in an .ENV file but left here for the tasks purpose
const options = {
    username: 'sago004',
    password: 'KX1~C^4U1e8GMz4'
}


let humidityFromMqtt = {
    greenhouseId: "",
    humidity: null
}
let sunlightFromMqtt = {
    greenhouseId: "",
    sunlight: null
}

const mqttConnection = mqtt.connect('mqtt://mqtt.toytronics.com', options)

// Subscribe to each sub-topic under elevator-monitor
mqttConnection.on("connect", () => {
    console.log("Connected to MQTT")
    mqttConnection.subscribe('greenhouse-monitor/greenhouseId-1/#')
    mqttConnection.subscribe('greenhouse-monitor/greenhouseId-2/#')
    mqttConnection.subscribe('greenhouse-monitor/greenhouseId-3/#')
    console.log("Subscribed successfully to greenhouse-monitors");
});

/** Posting messages from subscribed topic to mongodb.
 * Each time a reading is posted to our MQTT server it updates
 * the 4 topics: id, x, y and z. So 4 messages will be received.
 * Each topic is received with its entire path, for example:
 * students/sago004/elevator-monitor/elevatorId.
 * We want the last string of the topic path so we can store it in
 * the corresponding readings object, then we enter the data into that
 * same variable in the object.
 * In this example, the data is the elevators id.
 * 
 * When 4 messages have been read and none of the objects values
 * are null, we proceed with posting it to mongodb.
 * The readings will trigger a webhook to IFTTT depending 
 * on if any of the readings have exceeded what
 * we would consider critical or not.
 * 
 * For this task we have set the level to over 10 m/s^2,
 * that would be considered extensive shaking and a 'Hard shaking'
 * event is triggered, instead of the 'Moderate shaking' event.
 * 
 * Reset readings object to defaults so that next reading can
 * populate it without it triggering posting to db again with the old readings.
 */
mqttConnection.on("message", (topic, data) => {
    let readings = {};
    const topicParts = topic.toString().split('/');
    const element = topicParts[topicParts.length - 1];
    const greenhouseId = topicParts[topicParts.length - 2].split('-').pop();;
   
    console.log("incoming message from mqtt greenhouse " + greenhouseId + " with element " +  element + " " + data.toString());
    
    //readingsFromMqtt[lastTopicPart] = Number(data);

    if (data.toString() != null) {
        switch (element) {
            case "temperature":
                readings = new TemperatureModel({
                    greenhouseId: greenhouseId,
                    temperature: Number(data)
                });
                break;
            case "humidity":
                readings = new HumidityModel({
                    greenhouseId: greenhouseId,
                    humidity: Number(data)
                });
                break;
            case "sunlight":
                readings = new SunlightModel({
                    greenhouseId: greenhouseId,
                    sunlight: Number(data)
                });
            default:
                break;
        }
        readings.save()
        console.log("saved " + element + " from greenhouse " +  greenhouseId + " to db");
    }
});

mqttConnection.on("error", (error) => {
    console.error("MQTT connection error:", error);
});