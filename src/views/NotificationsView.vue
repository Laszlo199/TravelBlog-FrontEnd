<template>
  <!--wrapper div-->
  <div class="w-screen h-screen p-20">
    <div class="h-full">
      <!--Header    -->
      <!--
    <div class="bg-amber-200" >
      <h1 class="">Notifications</h1>
    </div>
-->

      <!--notifications-->
      <div class="md:pl-8 md:pr-8 2xl:pr-28 2xl:pl-28 w-full overflow-hidden">
        <div class="">
          <h1 class="text-4xl text-primary-orange font-bold mt-20 mb-4">
            Notifications
          </h1>
        </div>

        <notification></notification>
        <notification></notification>
      </div>
      <!--      <div v-for="notification in notifications">
          <notification></notification>
      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Notification from "@/components/Notification.vue";

const notifications = ref([]);
</script>
<style scoped></style>
