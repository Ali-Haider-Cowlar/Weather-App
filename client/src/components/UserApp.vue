<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  />

  <div>
    <h1 class="text-4xl font-bold text-gray-900">
      Weather<span class="text-blue-500">App</span>
    </h1>
    <br />

    <table class="border-collapse w-full shadow-lg">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="border border-gray-400 p-2 text-left">Name</th>
          <th class="border border-gray-400 p-2 text-left">Email</th>
          <th class="border border-gray-400 p-2 text-left">CNIC</th>
          <th class="border border-gray-400 p-2 text-left">Creation Time</th>
          <th class="border border-gray-400 p-2 text-left">Actions</th>
        </tr>
      </thead>

      <tbody class="max-h-2 h-10 overflow-y-auto sm:max-h-1/2">
        <tr v-for="user in usersList" :key="user._id" class="hover:bg-gray-100">
          <td class="border border-gray-400 p-2">{{ user.name }}</td>
          <td class="border border-gray-400 p-2">{{ user.email }}</td>
          <td class="border border-gray-400 p-2">{{ user.cnic }}</td>
          <td class="border border-gray-400 p-2">
            {{ moment(user.creationTime).format("D-MM-YY, h:mm a") }}
          </td>
          <td class="border border-gray-400 p-2">
            <button
              id="button"
              data-modal-toggle="modal"
              type="button"
              class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline inline-block"
            >
              <i class="far fa-edit" aria-hidden="true"></i>
            </button>
            <button
              class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline inline-block ml-1"
              @click="deleteUser(user._id)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <br />

    <div>
      <div class="flex justify-center p-4">
        <button
          id="button"
          data-modal-toggle="modal"
          type="button"
          class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add User
        </button>
      </div>

      <div
        id="modal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div
              class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600"
            >
              <h3
                class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white"
              >
                User Registration
              </h3>
              <button
                id="closeButton"
                data-modal-hide="modal"
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                  >Name</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autocomplete="given-name"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    v-model="newUserName"
                  />
                </div>
              </div>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                  >Email address</label
                >
                <div class="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="email"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    v-model="newUserEmail"
                  />
                </div>
              </div>
              <div>
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                  >Password</label
                >
                <div class="mt-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="current-password"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    v-model="newUserPassword"
                  />
                </div>
              </div>
              <div>
                <label
                  for="cnic"
                  class="block text-sm font-medium text-gray-700"
                  >CNIC</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    name="cnic"
                    id="cnic"
                    autocomplete="given-name"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    v-model="newUserCnic"
                  />
                </div>
              </div>
            </div>
            <!-- Modal footer -->
            <div
              class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="addUser"
                data-modal-toggle="modal"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { initFlowbite } from "flowbite";
import moment from "moment";

onMounted(() => {
  initFlowbite();
});

const users = ref([]);
const API_URL = "http://localhost:5000";
const newUserName = ref("");
const newUserEmail = ref("");
const newUserPassword = ref("");
const newUserCnic = ref("");

axios
  .get(`${API_URL}/user`)
  .then((response) => {
    users.value.push(...response.data.users);
  })
  .catch((error) => {
    console.log(error);
  });

const usersList = computed(() => {
  return users.value;
});

function addUser() {
  axios
    .post(`${API_URL}/user`, {
      name: newUserName.value,
      email: newUserEmail.value,
      password: newUserPassword.value,
      cnic: newUserCnic.value,
    })
    .then(() => {
      axios
        .get(`${API_URL}/user`)
        .then((response) => {
          users.value = [];
          newUserName.value = "";
          newUserEmail.value = "";
          newUserPassword.value = "";
          newUserCnic.value = "";
          users.value.push(...response.data.users);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteUser(id) {
  axios
    .delete(`${API_URL}/user/${id}`)
    .then((response) => {
      users.value = users.value.filter((user) => user._id !== id);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<script>
export default {
  name: "MyComponent",
  setup() {
    return { usersList, newUserName, addUser, deleteUser };
  },
};
</script>
<style scoped>
@media (min-height: 50vh) {
  .users-container {
    max-height: calc(50vh - 4rem);
    overflow-y: auto;
  }
}
</style>
