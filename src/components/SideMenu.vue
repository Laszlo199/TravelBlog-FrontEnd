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
      <div @click="openLabel='SEARCH'"
           :class="{'text-primary-orange': openLabel=='SEARCH',  'hover:text-primary-orange': openLabel=='SEARCH'}"
           class="flex flex-row items-center hover:cursor-pointer hover:text-primary-grey text-black">
        <SearchCircleIcon class="w-4 h-4"/>
        <RouterLink to="/search">
          <p class="ml-3">search</p>
        </RouterLink>
      </div>

      <div @click="openLabel='ADDPOST'"
           :class="{'text-primary-orange': openLabel=='ADDPOST',  'hover:text-primary-orange': openLabel=='ADDPOST'}"
           class="flex flex-row items-center hover:cursor-pointer hover:text-primary-grey text-black">
        <PlusCircleIcon class="w-4 h-4"/>
        <RouterLink to="/add-post">
          <p class="ml-3">add post</p>
        </RouterLink>
      </div>

      <div @click="openLabel='MYPOSTS'"
           :class="{'text-primary-orange': openLabel=='MYPOSTS',  'hover:text-primary-orange': openLabel=='MYPOSTS'}"
           class="flex flex-row items-center hover:cursor-pointer hover:text-primary-grey text-black">
        <CollectionIcon class="w-4 h-4"/>
        <RouterLink to="/my-posts">
          <p class="ml-3">my posts</p>
        </RouterLink>
      </div>

      <div @click="openLabel='FAVOURITES'"
           :class="{'text-primary-orange': openLabel=='FAVOURITES',  'hover:text-primary-orange': openLabel=='FAVOURITES'}"
           class="flex flex-row items-center hover:cursor-pointer hover:text-primary-grey text-black">
        <HeartIcon class="w-4 h-4"/>
        <RouterLink to="/favourite-posts">
          <p class="ml-3">favourites</p>
        </RouterLink>
      </div>

      <div @click="openLabel='NOTIFICATIONS'"
           :class="{'text-primary-orange': openLabel=='NOTIFICATIONS',  'hover:text-primary-orange': openLabel=='NOTIFICATIONS'}"
           class="flex flex-row items-center hover:cursor-pointer hover:text-primary-grey text-black">
        <BellIcon class="w-4 h-4"/>
        <div v-if="notificationsStore.notifications.length>0"
             class="w-4 h-4 rounded-full bg-primary-red relative text-white text-xs align-text-center right-2 top-2 flex justify-center">
          {{notificationsStore.notifications.length}}</div>
        <RouterLink to="/notifications">
          <p :class="{ 'ml-3': notificationsStore.notifications.length==0 }">notifications</p>
        </RouterLink>
      </div>
    </div>

    <!--LOG OUT-->
    <h2 @click="logout" class="text-lg font-bold mt-20">Log out</h2>
  </div>
</template>

<script setup lang="ts">
import {
  SearchCircleIcon,
  PlusCircleIcon,
  CollectionIcon,
  StarIcon,
  BellIcon,
  CogIcon,
  HeartIcon
} from "@heroicons/vue/outline";
import { AuthStore } from "@/stores/auth.store";
import {ref} from "vue";
import {NotificationsStore} from "@/stores/notifications";

//SEARCH / ADDPOST / MYPOSTS / FAVOURITES / NOTIFICATIONS
const openLabel = ref("SEARCH")

const notificationsStore =  NotificationsStore()
const authStore = AuthStore();

function logout() {
  authStore.logout();
  window.location.replace("/");
}
</script>

<style scoped></style>
