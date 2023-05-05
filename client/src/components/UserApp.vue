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

    <table class="border-collapse w-full shadow-lg scrollable-tbody">
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
            {{ moment(user.creationTime).format("MMMM Do YYYY, h:mm a") }}
          </td>
          <td class="border border-gray-400 p-2">
            <button
              id="button"
              data-modal-toggle="editModal"
              type="button"
              class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline inline-block"
              @click="openEditModal(user)"
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
      <!-- Edit Modal -->
      <div
        id="editModal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed ml-[35%] mt-24 z-50 hidden w-96 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
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
                Edit User
              </h3>
              <button
                id="editCloseButton"
                data-modal-hide="editModal"
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                @click="closeModal('editModal')"
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
                  for="editName"
                  class="block text-sm font-medium text-gray-700"
                  >Name</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    name="editName"
                    id="editName"
                    autocomplete="given-name"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    v-model="editUserData.name"
                  />
                </div>
              </div>
              <div>
                <label
                  for="editEmail"
                  class="block text-sm font-medium text-gray-700"
                  >Email address</label
                >
                <div class="mt-1">
                  <input
                    type="email"
                    name="editEmail"
                    id="editEmail"
                    autocomplete="email"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    v-model="editUserData.email"
                  />
                </div>
              </div>
              <div>
                <label
                  for="editPassword"
                  class="block text-sm font-medium text-gray-700"
                  >Password</label
                >
                <div class="mt-1">
                  <input
                    type="password"
                    name="editPassword"
                    id="editPassword"
                    autocomplete="current-password"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    v-model="editUserData.password"
                  />
                </div>
              </div>
              <div>
                <label
                  for="editCnic"
                  class="block text-sm font-medium text-gray-700"
                  >CNIC</label
                >
                <div class="mt-1">
                  <input
                    type="text"
                    name="editCnic"
                    id="editCnic"
                    autocomplete="given-name"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    v-model="editUserData.cnic"
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
                @click="
                  updateUser(editUserData._id);
                  closeModal('editModal');
                "
                data-modal-hide="editModal"
              >
                Save Changes
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
// import the Toast library
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";

onMounted(() => {
  initFlowbite();
});

const users = ref([]);
const API_URL = "http://localhost:5000";

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

function deleteUser(id) {
  axios
    .delete(`${API_URL}/user/${id}`)
    .then(() => {
      users.value = users.value.filter((user) => user._id !== id);
      deleteToast();
    })
    .catch((error) => {
      console.log(error);
    });
}

const editUserData = ref({});

function openEditModal(user) {
  editUserData.value = { ...user };
}

function updateUser(id) {
  axios
    .put(`${API_URL}/user/${id}`, {
      name: editUserData.value.name,
      email: editUserData.value.email,
      password: editUserData.value.password,
      cnic: editUserData.value.cnic,
    })
    .then(() => {
      axios
        .get(`${API_URL}/user`)
        .then((response) => {
          users.value = response.data.users;
          editToast();
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

// listen to click events on the page
document.addEventListener("click", (event) => {
  const modalToggle = event.target.closest("[data-modal-toggle]");
  const modalHide = event.target.closest("[data-modal-hide]");

  if (modalToggle) {
    const modalId = modalToggle.dataset.modalToggle;
    const modal = document.getElementById(modalId);
    modal.classList.toggle("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  if (modalHide) {
    const modalId = modalHide.dataset.modalHide;
    const modal = document.getElementById(modalId);
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }
});

// Toasts
//Edit Toast
const editToast = () => {
  createToast("Credentials Updated", {
    showIcon: "true",
    position: "top-center",
    type: "success",
    transition: "slide",
  });
};
//Delete Toast
const deleteToast = () => {
  createToast("User Removed", {
    showIcon: "true",
    position: "top-center",
    type: "success",
    transition: "slide",
  });
};
</script>

<script>
export default {
  name: "MyComponent",
  setup() {
    return {
      usersList,
      deleteUser,
      openEditModal,
      editUserData,
      updateUser,
      editToast,
      deleteToast,
    };
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
.scrollable-tbody {
  display: block;
  max-height: 380px; /* Adjust the height as per your requirement */
  overflow-y: scroll;
}

.scrollable-tbody::-webkit-scrollbar {
  width: 8px;
}

.scrollable-tbody::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.scrollable-tbody::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.scrollable-tbody::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.scrollable-tbody tr {
  width: 100%;
}
</style>
