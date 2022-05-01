<template>
  <div
    class="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0"
  >
    <div class="w-full sm:max-w-md p-5 mx-auto">
      <h2 class="mb-12 text-center text-5xl font-extrabold">Sign Up.</h2>
      <form>
        <div class="mb-4">
          <label class="block mb-1" for="userName">User Name</label>
          <input
            v-model="inputUserName"
            id="userName"
            type="text"
            name="userName"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-1" for="password">Password</label>
          <input
            v-model="inputPassword"
            id="password"
            type="password"
            name="password"
            class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
          />
        </div>
        <div class="mt-6 flex items-center justify-between"></div>
        <div class="mt-6">
          <button
            @click="registerUser"
            class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
          >
            Sign Up
          </button>
        </div>
        <div class="mt-6 text-center">
          <RouterLink to="/login">
            <a href="#" class="underline">Already Have an account ? Sing In</a>
          </RouterLink>
        </div>
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
const authStore = AuthStore();

function registerUser() {
  if (inputUserName.value.length > 0 && inputPassword.value.length > 0) {
    authStore.registerUser(inputUserName.value, inputPassword.value);
    router.push({ path: "/login" });
  }
}
</script>

<style scoped></style>
