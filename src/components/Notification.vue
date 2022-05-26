<template>
  <!-- content wrapper  -->
  <div
    class="flex flex-row w-full mx-auto bg-white overflow-hidden p-4 justify-between"
  >

    <!-- info 1    -->
    <div class="flex flex-col gap-2">
      <div class="flex flex-row">
        <div class="font-medium">

          <!--comment-->
          <p v-if="theNotification.notificationType === 'comment'">New comment for&nbsp;</p>
          <p v-else-if="theNotification.notificationType === 'favourite'">{{theNotification.userName}} just saved&nbsp;</p>
          <p v-else-if="theNotification.notificationType === 'like'">{{theNotification.userName}} just liked&nbsp;</p>
        </div>

        <div class="text-primary-orange font-bold">
          <!--comment && favourite-->
          <p>{{showText(theNotification.postName)}}</p>
        </div>
      </div>

      <div class="flex flex-row text-sm">
        <div class="">
          <!--comment-->
          <p v-if="theNotification.notificationType === 'comment'">{{theNotification.userName}} wrote&nbsp;</p>
        </div>

        <div class="">
          <!--comment-->
          <p v-if="theNotification.notificationType === 'comment'">"{{showText(theNotification.text)}}"</p>
        </div>
      </div>

      <div class="flex flex-row text-xs text-zinc-400">
        <div class="">
          <!--comment && favourite -->
          <p class="">{{formatDate(theNotification.date)}}</p>
        </div>

      </div>

    </div>

    <!-- take all of the left space - Buttons -->
    <div class="flex flex-row items-center gap-4 mr-4">
        <ArrowRightIcon @click="$emit('redirect')" class="h-6 w-6 hover:opacity-40 opacity-90 cursor-pointer" />
        <XIcon @click="$emit('remove', i)" class="w-6 h-6 hover:opacity-40 opacity-90 cursor-pointer"></XIcon>
    </div>
  </div>
</template>

<script setup lang="ts">



import { ref } from "vue";
import type { GetNotificationDto } from "@/Dtos/notification/GetNotificationDto";
import {XIcon, ArrowRightIcon} from "@heroicons/vue/outline"

const date = ref();

const props = defineProps<{
  theNotification: GetNotificationDto;
}>();

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en',
    { hour: 'numeric', year: 'numeric', month: 'long', day: 'numeric'})
}

function showText(text: string){
  if(text.length>100)
    text= text.slice(0, 100) +"...";
  return text;
}


</script>


<style scoped></style>
