<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-logo">
          <LogoSVG alt="Vite logo" />
          <h1 class="text-3xl font-bold text-gray-900">
            Weather<span class="text-blue-500">App</span>
          </h1>
        </div>
        <div class="navbar-menu">
          <ul>
            <li v-if="isLoggedIn"><RouterLink to="/">Home</RouterLink></li>
            <li v-if="isLoggedIn">
              <RouterLink to="/weather">Weather</RouterLink>
            </li>
            <li v-if="isLoggedIn"><RouterLink to="/user">Users</RouterLink></li>
            <li v-if="!isLoggedIn">
              <RouterLink to="/signup">Create Account</RouterLink>
            </li>
            <li v-if="!isLoggedIn">
              <RouterLink to="/login">Login</RouterLink>
            </li>
            <li v-if="isLoggedIn">
              <button @click="logoutUser">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <RouterView class="router-view" />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import LogoSVG from "./assets/logo.svg?component";
import { computed } from "vue";

const isLoggedIn = computed(() => {
  const token = localStorage.getItem("token");
  return token !== null && token !== undefined && token !== "";
});

function logoutUser() {
  localStorage.removeItem("token");
  location.reload(); // reload the page to reflect the updated state
}
</script>

<style scoped>
.navbar {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-logo {
  display: flex;
  align-items: center;
}

.navbar-logo svg {
  height: 30px;
}

.navbar-menu ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-menu li {
  margin: 0 1rem;
}

.navbar-menu a {
  color: #555;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.navbar-menu a:hover {
  color: #333;
}

.router-view {
  margin-top: 5rem;
}
</style>
