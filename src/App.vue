<script setup lang="ts">
import SideMenu from "@/components/SideMenu.vue";

</script>

<template>
  <div class="flex flex-row w-screen h-screen bg-background-grey">
    <SideMenu />
    <RouterView />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
