<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="container">
    <div class="flex justify-center items-center h-screen">
      <div class="shadow-xl p-6 rounded-lg w-full max-w-md lg:max-w-2xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          User <span class="text-blue-500">Registration</span>
        </h1>

        <form class="max-w-md mx-auto space-y-6">
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <div class="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                autocomplete="given-name"
                class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md px-4 py-2"
                v-model="newUserName"
                required
              />
            </div>
          </div>
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
          <div>
            <label
              for="cnic"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              CNIC
            </label>
            <div class="mt-1">
              <input
                type="text"
                name="cnic"
                id="cnic"
                autocomplete="given-name"
                class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md px-4 py-2"
                v-model="newUserCnic"
                required
              />
            </div>
          </div>
          <div class="flex justify-center mt-6">
            <button
              type="submit"
              @click="addUser"
              class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5"
            >
              Create Account
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

const newUserName = ref("");
const newUserEmail = ref("");
const newUserPassword = ref("");
const newUserCnic = ref("");
const API_URL = "http://localhost:5000";

function addUser(event) {
  event.preventDefault();
  axios
    .post(`${API_URL}/user`, {
      name: newUserName.value,
      email: newUserEmail.value,
      password: newUserPassword.value,
      cnic: newUserCnic.value,
    })
    .then(() => {
      console.log("User added successfully");
      newUserName.value = "";
      newUserEmail.value = "";
      newUserPassword.value = "";
      newUserCnic.value = "";
      registrationToast();
    })
    .catch((error) => {
      registrationFailedToast();
      console.log(error);
    });
}

// Toasts
//Login Success Toast
const registrationToast = () => {
  createToast("Registration Successful", {
    showIcon: "true",
    position: "top-center",
    type: "success",
    transition: "slide",
  });
};
//Registration Failed Error Toast
const registrationFailedToast = () => {
  createToast("Registration Failed! Try Again", {
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
      registrationToast,
      registrationFailedToast,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: -5%;
  max-height: 85vh;
  min-height: 50vh;
}
</style>
