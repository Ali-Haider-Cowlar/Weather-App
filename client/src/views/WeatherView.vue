<!-- eslint-disable no-unused-vars -->
<template>
  <div class="bg-gray-100 p-4 rounded-lg shadow-md">
    <div v-if="weather" class="text-lg font-medium mb-4" :title="weather.name">
      Weather for {{ weather ? weather.name : "your location" }}
    </div>
    <div v-if="weather">
      <div class="flex flex-col sm:flex-row">
        <div class="mr-4">
          <p class="text-5xl font-semibold">{{ weather.temperature }}°C</p>
          <p class="text-sm text-gray-500">{{ weather.condition }}</p>
        </div>
        <div class="flex-1">
          <p class="text-sm">
            <span class="font-semibold">Pressure:</span> {{ weather.pressure }}
          </p>
          <p class="text-sm">
            <span class="font-semibold">Wind speed:</span>
            {{ weather.wind_speed }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading weather data...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://localhost:5000";
import { connectMqttClient } from "../mqttConnection";
const { client } = connectMqttClient();

export default {
  data() {
    return {
      weather: null,
    };
  },
  created() {
    const token = localStorage.getItem("token");
    client.subscribe("weather-station", function (err) {
      if (!err) {
        console.log("Subscribed to weather-station topic");
      }
    });
    client.on("message", function (topic, message) {
      console.log("Received weather data:", message.toString());
      const weatherData = JSON.parse(message.toString());
      localStorage.setItem("weather", JSON.stringify(weatherData));
    });

    const updateWeatherData = () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await axios
          .get(
            `${API_URL}/api/weather?longitude=${position.coords.longitude}&latitude=${position.coords.latitude}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            this.weather = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    };
    // updateWeatherData();
    setInterval(updateWeatherData, 5000);
  },
};
</script>
