const mqtt = require('mqtt');
const axios = require('axios');
const { TemperatureModel, HumidityModel, SunlightModel } = require("./models/readingsModels");
const { sendNotificationEmail } = require("./mailNotification.js");

let lastSentTimeTemperature = null;
let lastSentTimeHumidity = null;
let lastSentTimeSunlight = null;
const temperatureTimer = Date.now();
const humidityTimer = Date.now();
const sunlightTimer = Date.now();

function sendEmailNotification(element, data, greenhouseId) {
    console.log(data + " " + element + " " + greenhouseId);
    const errorMailMessage = 
    "The " +  element + " recorded at greenhouse with id " + greenhouseId + " was not within valid limits, check website";
    switch (element) {
        case "temperature":
            // Check if enough time has passed since last email was sent
            if (lastSentTimeTemperature === null || temperatureTimer - lastSentTimeTemperature >= 3 * 60 * 1000) {
            
            if (data < 24) sendNotificationEmail("Low " + element, errorMailMessage);
            if (data > 33) sendNotificationEmail("High " + element, errorMailMessage);
            // Update lastSentTime
            lastSentTimeTemperature = temperatureTimer;
            } else {
            // Cooldown timer not expired yet, skip sending email
            console.log('Cooldown timer active for temperature, skipping email notification');
            }
            break;
        case "humidity":
            // Check if enough time has passed since last email was sent
            if (lastSentTimeHumidity === null || humidityTimer - lastSentTimeHumidity >= 3 * 60 * 1000) {
            if (data < 65) sendNotificationEmail("Low " + element, errorMailMessage);
            if (data > 75) sendNotificationEmail("High " + element, errorMailMessage);
                
            // Update lastSentTime
            lastSentTimeHumidity = humidityTimer;
            } else {
            // Cooldown timer not expired yet, skip sending email
            console.log('Cooldown timer active for humidity, skipping email notification');
            }
            break;
        case "sunlight":
            // Check if enough time has passed since last email was sent
            if (lastSentTimeSunlight === null || sunlightTimer - lastSentTimeSunlight >= 3 * 60 * 1000) {
            //if (data < 65) sendNotificationEmail("Low " + element, errorMailMessage);
            //if (data > 75) sendNotificationEmail("High " + element, errorMailMessage);
    
            // Update lastSentTime
            lastSentTimeSunlight = sunlightTimer;
            } else {
            // Cooldown timer not expired yet, skip sending email
            console.log('Cooldown timer active for sunlight, skipping email notification');
            }
            break;
        default:
            break;
    }
}

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
    const greenhouseId = topicParts[topicParts.length - 2].split('-').pop();
    const dataAsNumber = Number(data);
   
    //console.log("incoming message from mqtt greenhouse " + greenhouseId + " with element " +  element + " " + data.toString());
    
    //readingsFromMqtt[lastTopicPart] = Number(data);
    
    if (data.toString() != null) {
        switch (element) {
            case "temperature":
                if (dataAsNumber < 24 || dataAsNumber > 33) {
                    //sendEmailNotification(element, dataAsNumber, greenhouseId);
                }
                readings = new TemperatureModel({
                    greenhouseId: greenhouseId,
                    temperature: Number(data)
                });
                break;
            case "humidity":
                if (dataAsNumber < 24 || dataAsNumber > 33) {
                    //sendEmailNotification(element, dataAsNumber, greenhouseId);
                }
                readings = new HumidityModel({
                    greenhouseId: greenhouseId,
                    humidity: Number(data)
                });
                break;
            case "sunlight":
                if (dataAsNumber < 24 || dataAsNumber > 33) {
                    //sendEmailNotification(element, dataAsNumber, greenhouseId);
                }
                readings = new SunlightModel({
                    greenhouseId: greenhouseId,
                    sunlight: Number(data)
                });
            default:
                break;
        }
        readings.save()
        //console.log("saved " + element + " from greenhouse " +  greenhouseId + " to db");
    }
});

mqttConnection.on("error", (error) => {
    console.error("MQTT connection error:", error);
});