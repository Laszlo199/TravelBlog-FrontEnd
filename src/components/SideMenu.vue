<template>
  <div
    class="flex flex-col justify-between pt-10 pl-14 pb-20 h-screen w-80 bg-white"
  >
    <!--HEADER-->
    <h1 class="text-3xl font-bold flex flex-row">
      <p class="text-black">We</p>
      <p class="text-primary-orange">Travel.</p>
    </h1>

    <!--TABS-->
    <div class="flex flex-col text-lg font-medium text-black space-y-3">
      <div
        class="flex flex-row items-center hover:cursor-pointer hover:text-primary-grey"
      >
        <SearchCircleIcon class="w-4 h-4" />
        <RouterLink to="/search">
          <p class="ml-3">search</p>
        </RouterLink>
      </div>

      <div
        class="flex flex-row items-center hover:cursor-pointer hover:text-primary-grey"
      >
        <PlusCircleIcon class="w-4 h-4" />
        <RouterLink to="/add-post">
          <p class="ml-3">add post</p>
        </RouterLink>
      </div>

      <div
        class="flex flex-row items-center hover:cursor-pointer hover:text-primary-grey"
      >
        <CollectionIcon class="w-4 h-4" />
        <RouterLink to="/my-posts">
          <p class="ml-3">my posts</p>
        </RouterLink>
      </div>

      <div
        class="flex flex-row items-center hover:cursor-pointer hover:text-primary-grey"
      >
        <HeartIcon class="w-4 h-4" />
        <RouterLink to="/favourite-posts">
          <p class="ml-3">favourites</p>
        </RouterLink>
      </div>

      <div
        class="flex flex-row items-center hover:cursor-pointer hover:text-primary-grey"
      >
        <BellIcon class="w-4 h-4" />
        <RouterLink to="/notifications">
          <p class="ml-3">notifications</p>
        </RouterLink>
      </div>

      <div
        class="flex flex-row items-center hover:cursor-pointer hover:text-primary-grey"
      >
        <CogIcon class="w-4 h-4" />
        <p class="ml-3">settings</p>
      </div>
    </div>

    <!--LOG OUT-->
    <h2 class="text-lg font-bold mt-20">Log out</h2>
  </div>
</template>

<script setup lang="ts">
import {
  SearchCircleIcon,
  PlusCircleIcon,
  CollectionIcon,
  HeartIcon,
  BellIcon,
  CogIcon,
} from "@heroicons/vue/outline";
</script>

<style scoped></style>
