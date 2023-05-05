<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="container">
    <div class="flex justify-center items-center h-screen">
      <div class="shadow-xl p-6 rounded-lg mt-4 mt--96">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          User <span class="text-blue-500">Login</span>
        </h1>

        <form class="max-w-md mx-auto space-y-6">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Email address
            </label>
            <div class="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md px-4 py-2"
                v-model="newUserEmail"
                required
              />
            </div>
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                type="password"
                name="password"
                id="password"
                autocomplete="current-password"
                class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md px-4 py-2"
                v-model="newUserPassword"
                required
              />
            </div>
          </div>

          <div class="flex justify-center mt-6">
            <button
              type="submit"
              @click="loginUser"
              class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
// import the Toast library
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";

const newUserEmail = ref("");
const newUserPassword = ref("");

const API_URL = "http://localhost:5000";

function loginUser(event) {
  event.preventDefault();
  axios
    .post(`${API_URL}/user/login`, {
      email: newUserEmail.value,
      password: newUserPassword.value,
    })
    .then((response) => {
      console.log("User login successful");
      localStorage.setItem("token", response.data.token); // store token in localStorage
      newUserEmail.value = "";
      newUserPassword.value = "";
      location.reload(); // reload the page to reflect the updated state
      loginToast();
    })
    .catch((error) => {
      loginFailed();
      console.log(error);
    });
}

// Toasts
//Login Success Toast
const loginToast = () => {
  createToast("Logged In Successfully", {
    showIcon: "true",
    position: "top-center",
    type: "success",
    transition: "slide",
  });
};
//Login Failed Error Toast
const loginFailed = () => {
  createToast("Login Failed! Try Again", {
    showIcon: "true",
    position: "top-center",
    type: "danger",
    transition: "slide",
  });
};
</script>

<script>
export default {
  name: "MyComponent",
  setup() {
    return {
      loginToast,
      loginFailed,
    };
  },
};
</script>

<style scoped>
/* Center the parent container horizontally and vertically */
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
}
/* Set the height of the parent container to the full screen height */
.h-screen {
  height: 100vh;
}
.container {
  margin-top: -5%;
}
</style>
