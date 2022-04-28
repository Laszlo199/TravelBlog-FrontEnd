<template>
  <div class="flex flex-col h-screen w-800 mx-auto justify-center">
    <h1 class="text-4xl text-primary-orange font-bold mt-20 mb-4">Search</h1>

    <div class="flex flex-row space-x-8">

      <div class="w-1/2 py-2 px-4 bg-white flex flex-row items-center justify-between">
        <input class="placeholder:text-primary-grey text-black text-sm w-full focus:outline-none" placeholder="Search by keyword..."/>
        <SearchIcon class="w-5 h-5 stroke-primary-grey"/>
      </div>

      <div class="w-1/2 py-2 px-4 bg-white flex flex-row items-center justify-between">
        <input class="placeholder:text-primary-grey text-black text-sm w-full focus:outline-none" placeholder="Location..."/>
        <LocationMarkerIcon class="w-5 h-5 stroke-primary-grey"/>
      </div>

    </div>

    <div class="mt-8 flex flex-col space-y-6 overflow-scroll">
      <Post />
      <Post />
      <Post />
    </div>
  </div>

</template>

<script setup lang="ts">
import {SearchIcon, LocationMarkerIcon} from "@heroicons/vue/outline";
import Post from "@/components/Post.vue";

</script>

<style scoped>

</style>