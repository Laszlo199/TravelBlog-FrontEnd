<template>
  <div class="w-full flex flex-col p-2">
    <div class="flex flex-row text-sm text-primary-grey">
      <p class="font-medium">{{ username }}</p>
      <p class="px-1"> · </p>
      <p>{{ date }}</p>
    </div>

    <p class="text-sm text-black">{{ text }}</p>
  </div>

</template>

<script setup lang="ts">

const username = "maya_blue";
const date = "15/05/2022";
const text = "This is a comment !!";

</script>

<style scoped>

</style>