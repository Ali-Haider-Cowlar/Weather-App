/* eslint-disable no-undef */

const mqtt = require("mqtt");
const client = mqtt.connect("ws://mbs.docker:8081");

client.on("connect", function () {
  client.subscribe("weather-station", function (err) {
    if (!err) {
      console.log("Subscribed to weather-station topic");
    } else console.log({ err });
  });
});

client.on("error", function (err) {
  console.log({ err });
});


module.exports = client;
