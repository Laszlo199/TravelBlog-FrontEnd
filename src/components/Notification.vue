<template>
  <!-- content wrapper  -->
  <div
    class="flex flex-row h-24 w-full mx-auto bg-white overflow-hidden m-5"
  >

    <!-- info 1    -->
    <div class="grow">
      <div class="flex flex-row mt-2 ml-2 ">
        <div class="pr-2 font-medium">

          <!--comment-->
          <p v-if="theNotification.notificationType === 'comment'">New comment for</p>
          <p v-else-if="theNotification.notificationType === 'favourite'">{{theNotification.userName}} just saved</p>
          <p v-else-if="theNotification.notificationType === 'like'">{{theNotification.userName}} just liked</p>
        </div>

        <div class="text-primary-orange font-bold">
          <!--comment && favourite-->
          <p>{{showText(theNotification.postName)}}</p>
        </div>
      </div>

      <div class="flex flex-row mt-2 ml-2 text-sm">
        <div class="pr-2 ">
          <!--comment-->
          <p v-if="theNotification.notificationType === 'comment'">{{theNotification.userName}} wrote</p>
        </div>

        <div class="">
          <!--comment-->
          <p v-if="theNotification.notificationType === 'comment'"> "{{showText(theNotification.text)}}"</p>
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
      <div  @click="$emit('redirect')" class="lg:pr-2 xl:pr-4 2xl:8 hover ">
        <ArrowRightIcon class="h-7 w-7 hover:opacity-40 opacity-90" />
      </div>

      <div class="pl-5 xl:14 pr-6" @click="$emit('remove', i)">
        <XIcon class="w-7 h-7 hover:opacity-40 opacity-90"></XIcon>
      </div>
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
