<template>
  <div>
    <b-card :title="location">
      <div v-if="weather">
        <p>Temperature: {{ weather.temperature }}</p>
        <p>Humidity: {{ weather.humidity }}</p>
        <p>Pressure: {{ weather.pressure }}</p>
        <p>Wind speed: {{ weather.wind_speed }}</p>
      </div>
      <div v-else>
        <p>Loading weather data...</p>
      </div>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      weather: null,
    };
  },
  created() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      //Error here
      const { data } = await axios.get(
        `localhost:5000/api/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      );

      this.weather = data;
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
