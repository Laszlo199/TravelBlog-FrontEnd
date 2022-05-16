<template>
  <div class="flex flex-col h-screen w-800 mx-auto">
    <h1 class="text-4xl text-primary-orange font-bold mt-20 mb-4">Search</h1>

    <div class="flex flex-row space-x-8">
      <div
        class="w-1/2 py-2 px-4 bg-white flex flex-row items-center justify-between"
      >
        <input
          class="placeholder:text-primary-grey text-black text-sm w-full focus:outline-none"
          placeholder="Search by keyword..."
          v-model="search"
          @keyup="posts = filteredList(search)"
          @refresh="updateView"
        />
        <SearchIcon class="w-5 h-5 stroke-primary-grey" />
      </div>

      <div
        class="w-1/2 py-2 px-4 bg-white flex flex-row items-center justify-between"
      >
        <input
          class="placeholder:text-primary-grey text-black text-sm w-full focus:outline-none"
          placeholder="Location..."
        />
        <LocationMarkerIcon class="w-5 h-5 stroke-primary-grey" />
      </div>
    </div>

    <div class="mt-8 flex flex-col space-y-6 overflow-scroll">
      <div v-for="post in posts">
        <Post
          :the-post="post"
          :view-type="'SEARCHPOSTS'"
          @refresh="updateView"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchIcon, LocationMarkerIcon } from "@heroicons/vue/outline";
import Post from "@/components/Post.vue";
import { inject, ref } from "vue";
import { PostService } from "@/services/PostService";
import type { GetPostDto } from "@/Dtos/get.post.dto";

const postService = inject<PostService>("postService");
let posts = ref([] as GetPostDto[]);
const search = ref("");

postService
  ?.getAllPostNoId()
  .then((result) => {
    posts.value = result.data;
  })
  .catch((error) => console.log("err: " + error));

function filteredList(input: string) {
  const result = posts.value.filter((p) => p.title.includes(input));

  if (input.length === 0) {
    return posts;
  }
  return result;
}
</script>

<style scoped></style>
