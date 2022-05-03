<template>
  <div
    class="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0"
  >
    <div class="w-full sm:max-w-md p-5 mx-auto">
      <h2 class="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
      <form>
        <div class="mb-4">
          <label class="block text-md font-light mb-2" for="username"
            >Username</label
          >
          <input
            v-model="inputUserName"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            type="text"
            name="username"
            id=""
          />
        </div>
        <div class="mb-4">
          <label class="block text-md font-light mb-2" for="password"
            >Password</label
          >
          <input
            v-model="inputPassword"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            type="password"
            name="password"
            id=""
          />
        </div>
        <div class="pt-1 px-20">
          <label
            class="p-1 mb-5 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
            v-show="errorMessage"
            >{{ message }}</label
          >
        </div>

        <div class="flex items-center justify-between mb-5">
          <button
            @click="loginUser"
            class="w-full inline-flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-light py-2 px-6 rounded focus:ring focus:ring-offset-amber-400 disabled:opacity-25 transition"
            type="button"
          >
            Sing In
          </button>
        </div>

        <p class="text-center text-md font-light">
          Don't have an account?
          <RouterLink to="/register">
            <a href="#" class="underline text-md text-indigo-600">Sing Up</a>
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AuthStore } from "@/stores/auth.store";
import router from "@/router";

const inputUserName = ref("");
const inputPassword = ref("");
const errorMessage = ref(false);
const message = ref("");
const authStore = AuthStore();

function loginUser() {
  if (inputPassword.value == "" || inputUserName.value == "") {
    errorMessage.value = true;
    message.value = "Password and Username are required";
  } else {
    errorMessage.value = true;
    message.value = "Password and Username are wrong";
  }

  if (inputUserName.value && inputPassword.value) {
    errorMessage.value = false;
    authStore
      .loginUser(inputUserName.value, inputPassword.value)
      .then((response) => {
        router.push({ path: "/search" });
      });
  }
}
</script>

<style scoped></style>
