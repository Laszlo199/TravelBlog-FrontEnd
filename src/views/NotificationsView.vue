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
      <div onload="load()" class="md:pl-8 md:pr-8 2xl:pr-28 2xl:pl-28 w-full overflow-hidden">
        <div class="">
          <h1 class="text-4xl text-primary-orange font-bold mt-20 mb-4">
            Notifications
          </h1>
        </div >
        <div v-for="n in notificationsStore.notifications" v-bind:key="n.text"> <!--change that later-->
          <notification :the-notification="n" ></notification>
<!--          <notification></notification>
          <notification></notification>-->
        </div>
      </div>
      <!--      <div v-for="notification in notifications">
          <notification></notification>
      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">

import Notification from "@/components/Notification.vue";
import { NotificationsStore } from "@/stores/notifications";
import { ref } from "vue";
import type { GetNotificationDto } from "@/Dtos/notification/GetNotificationDto";

const notificationsStore = NotificationsStore()
const notifications = ref([]);
const userId = "6283639e5f1e8c4361970d07";

function load(){
 // notificationsStore.setUser(userId);
}


</script>
<style scoped></style>
