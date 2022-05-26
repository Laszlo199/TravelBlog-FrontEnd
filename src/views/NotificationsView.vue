<template>
  <!--wrapper div-->
  <div class="w-screen h-screen p-20 overflow-scroll">
    <div class="h-full">

      <!--notifications-->
      <div  class="md:pl-8 md:pr-8 2xl:pr-28 2xl:pl-28 w-full">
        <div class="">
          <h1 class="text-4xl text-primary-orange font-bold mt-20 mb-4">
            Notifications
          </h1>
        </div >
        <div  v-for="(n, i) in notificationsStore.notifications" >
          <notification  @remove='remove(i)' @redirect="redirect()" :the-notification="n" :key="n.data" ></notification> <!--:key="n.data"-->
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

import Notification from "@/components/Notification.vue";
import { NotificationsStore } from "@/stores/notifications";
import router from "@/router";
const userId = "6283639e5f1e8c4361970d07";
const notificationsStore =  NotificationsStore()

function remove(i: number){
  notificationsStore.notifications.splice(i, 1)

}

function redirect() {
  router.push("my-posts")
}

</script>
<style scoped></style>
