<template>
  <div class="bg-gray-100 p-4 rounded-lg shadow-md">
    <div class="text-lg font-medium mb-4" :title="location">
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

export default {
  data() {
    return {
      weather: null,
    };
  },
  created() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      await axios
        .get(
          `${API_URL}/api/weather?longitude=${position.coords.longitude}&latitude=${position.coords.latitude}`
        )
        .then((response) => {
          this.weather = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  computed: {
    location() {
      if (this.weather) {
        return `${this.weather.temperature}°C at (${this.weather.latitude}, ${this.weather.longitude})`;
      } else {
        return "Loading weather data...";
      }
    },
  },
};
</script>

<style lang="scss">
.about {
  @apply lg:min-h-screen lg:flex lg:items-center;

  h1 {
    @apply text-xl font-medium text-black;
  }
}
</style>
