import mqtt from "mqtt/dist/mqtt";
import { ref } from "vue";

const receiveNews = ref("");
let client;
const connect = () => {
  client = mqtt.connect("ws://localhost:8080");
  return client;
};

const connectMqttClient = () => {
  connect();

  client.on("connect", () => {
    console.log("connection succeeded!");
  });

  client.on("error", (error) => {
    console.log("connection failed!", error);
  });

  client.on("message", (topic, message) => {
    receiveNews.value = receiveNews.value.concat(message.toString());
    // console.log(`Received message ${message.toString()} from topic ${topic}`);
  });

  return { client };
};

export { connectMqttClient };
