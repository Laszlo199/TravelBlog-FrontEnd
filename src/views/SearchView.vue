<template>
  <div class="flex flex-col h-screen w-800 mx-auto">
    <h1 class="text-4xl text-primary-orange font-bold mt-20 mb-4">Search</h1>

    <div class="flex flex-row space-x-4">
      <div
        class="w-2/5 py-2 px-4 bg-white flex flex-row items-center justify-between"
      >
        <input
          class="placeholder:text-primary-grey text-black text-sm w-full focus:outline-none"
          placeholder="Search by keyword..."
          v-model="keyword"
        />
        <SearchIcon class="w-5 h-5 stroke-primary-grey" />
      </div>

      <div
        class="w-2/5 py-2 px-4 bg-white flex flex-row items-center justify-between"
      >
        <input
          class="placeholder:text-primary-grey text-black text-sm w-full focus:outline-none"
          placeholder="Location..."
          v-model="location"
        />
        <LocationMarkerIcon class="w-5 h-5 stroke-primary-grey" />
      </div>

      <div @click="search()"
           class="w-1/5 py-2 px-4 bg-primary-orange cursor-pointer flex flex-row items-center text-white justify-center hover:bg-button-orange">
        search
      </div>
    </div>

    <!--RESULTS-->
    <div v-if="posts.length==0 && !isLoading" class="text-primary-grey mt-2">
    no results</div>

    <div v-if="isLoading" class="text-primary-grey mt-2">
      loading ...</div>

    <div v-if="posts.length>0" class="text-primary-grey text-sm mt-2">
      {{posts.length}} results found</div>

    <div class="mt-2 flex flex-col space-y-6 overflow-scroll">
      <div v-for="(post, index) in posts" v-bind:key="index">
        <Post :the-post="post" :view-type="'SEARCHPOSTS'" @refresh="search()"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchIcon, LocationMarkerIcon } from "@heroicons/vue/outline";
import Post from "@/components/Post.vue";
import {inject, ref} from "vue";
import type {PostService} from "@/services/PostService";

const postService = inject<PostService>("postService");
const keyword = ref('');
const location = ref('');
const isLoading = ref(false);
const posts = ref([]);

function search() {
  if(keyword.value!='' && location.value!='') {
    isLoading.value = true;
    postService
        ?.search(keyword.value, location.value)
        .then((result) => {
          posts.value = result.data;
          isLoading.value = false;
        })
        .catch((error) => console.log("error: " + error));
  }
}

</script>

<style scoped></style>
