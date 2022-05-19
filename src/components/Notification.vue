<template>
  <!-- content wrapper  -->
  <div
    class="flex flex-row h-24 w-full mx-auto bg-white shadow-md overflow-hidden m-5"
  >

    <!-- info 1    -->
    <div class="grow">
      <div class="flex flex-row mt-2 ml-2 ">
        <div class="pr-2 font-bold">

          <!--comment-->
          <p v-if="theNotification.notificationType === 'comment'">New comment for</p>
          <p v-else-if="theNotification.notificationType === 'favourite'">{{theNotification.userName}} just saved</p>
        </div>

        <div class="text-primary-orange font-bold">
          <!--comment && favourite-->
          <p>{{theNotification.postName}}</p>
        </div>
      </div>

      <div class="flex flex-row mt-2 ml-2 text-sm">
        <div class="pr-2 ">
          <!--comment-->
          <p v-if="theNotification.notificationType === 'comment'">{{theNotification.userName}} wrote</p>
        </div>

        <div class="">
          <!--comment-->
          <p v-if="theNotification.notificationType === 'comment'">{{theNotification.text}}</p>
        </div>
      </div>

      <div class="flex flex-row mt-2 ml-2 text-xs text-zinc-400">
        <div class="">
          <!--comment && favourite -->
          <p class="">{{formatDate(theNotification.date)}}</p>
        </div>

      </div>

    </div>

    <!-- take all of the left space - Buttons -->
    <div class="flex flex-row items-center">
      <div class="lg:pr-2 xl:pr-4 2xl:8 hover">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 hover:opacity-40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
      <div class="pr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 hover:opacity-40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import type { PostNotificationDto } from "@/Dtos/notification/PostNotificationDto";
import type { GetNotificationDto } from "@/Dtos/notification/GetNotificationDto";

const postName = ref();
const username = ref();
const comment = ref();
const date = ref();

const props = defineProps<{
  theNotification: GetNotificationDto;
}>();

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en',{ hour: 'numeric', year: 'numeric', month: 'long', day: 'numeric'})
}


</script>


<style scoped></style>
