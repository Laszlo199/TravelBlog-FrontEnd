<template>
  <div class="flex flex-col h-screen w-800 mx-auto">

    <div class="flex flex-row justify-between items-center mt-20 mb-4">

      <h1 class="text-4xl text-primary-orange font-bold">My posts</h1>

      <div class="flex flex-row space-x-4">
        <SearchIcon class="w-5 h-5"/>
        <SortAscendingIcon class="w-5 h-5"/>
      </div>
    </div>

    <div class="mt-8 flex flex-col space-y-6 overflow-scroll">
      <div v-for="(post, index) in posts" v-bind:key="index">
        <Post :the-post="post" :view-type="'MYPOSTS'" @refresh="updateView"/>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {SearchIcon, SortAscendingIcon} from "@heroicons/vue/outline";
import type {PostService} from "@/services/PostService";
import {computed, inject, ref} from "vue";
import type { GetPostDto } from "@/Dtos/get.post.dto";

const postService = inject<PostService>("postService");
const userId = "626ed3f991384128af52ad1b"; //TODO get actual user id when login implemented

const posts = ref([]);
const searchInput = ref('');

postService?.getAllPosts(userId)
    .then((result) => {posts.value = result.data;})
    .catch((error)=>console.log("error: "+error))

const filteredPosts = computed(()=> {
  return posts.value.filter((post: GetPostDto) => post.title.toLowerCase().includes(searchInput.value.toLowerCase())
      || post.description.toLowerCase().includes(searchInput.value.toLowerCase()));
});

function updateView() {
  postService?.getAllPosts(userId)
      .then((result) => {posts.value = result.data;})
      .catch((error)=>console.log("error: "+error))
}

</script>

<style scoped>

</style>