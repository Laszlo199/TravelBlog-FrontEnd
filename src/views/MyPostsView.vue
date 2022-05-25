<template>
  <div on="listenNotifications()" class="flex flex-col h-screen w-800 mx-auto">
    <div class="flex flex-row justify-between items-center mt-20 mb-4">
      <h1 class="text-4xl text-primary-orange font-bold">My posts</h1>

      <div class="flex flex-row space-x-4 items-center">
        <!--SEARCH INPUT-->
        <div
          v-if="isSearch"
          id="searchContainer"
          class="w-96 py-2 px-4 bg-white flex flex-row items-center justify-between input-animation"
        >
          <input
            type="text"
            placeholder="Search..."
            v-model="searchInput"
            class="placeholder:text-primary-grey text-black text-sm w-full focus:outline-none"
          />
          <XIcon
            @click="closeInput()"
            class="w-5 h-5 stroke-primary-grey hover:cursor-pointer"
          />
        </div>

        <SearchIcon
          @click="isSearch = true"
          class="w-5 h-5 hover:cursor-pointer"
          :class="isSearch ? 'stroke-primary-orange' : ''"
        />
        <SortMenu @sort="sortPosts" class="float-right" />
      </div>
    </div>

    <div class="mt-2 flex flex-col space-y-6 overflow-scroll">
      <div v-for="post in filteredPosts">
        <Post :the-post="post" :view-type="'MYPOSTS'" @refresh="updateView" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchIcon, SortAscendingIcon, XIcon } from "@heroicons/vue/outline";
import Post from "@/components/Post.vue";
import SortMenu from "@/components/SortMenu.vue";
import { PostService } from "@/services/PostService";
import { computed, inject, ref } from "vue";
import * as _ from "underscore";
import type { GetPostDto } from "@/Dtos/get.post.dto";
import { AuthStore } from "@/stores/auth.store";

const notifications = NotificationsStore();
const postService = inject<PostService>("postService");
const authStore = AuthStore();
const userId = authStore.getUserid;

const posts = ref([]);
const searchInput = ref("");

function listenNotifications() {
  //notifications.setUser(userId);
}
const isSearch = ref(false);
const sortType = ref("");


postService
  ?.getAllPosts(userId)
  .then((result) => {
    notifications.setUser(userId);
    posts.value = result.data;
  })
  .catch((error) => console.log("error: " + error));

const filteredPosts = computed(() => {
  if (sortType.value == "date_asc")
    return _.sortBy(posts.value, ["date"]).filter(
      (post: GetPostDto) =>
        post.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        post.description
          .toLowerCase()
          .includes(searchInput.value.toLowerCase()) ||
        post.username.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        post.location.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  else if (sortType.value == "date_desc")
    return _.sortBy(posts.value, ["date"])
      .filter(
        (post: GetPostDto) =>
          post.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
          post.description
            .toLowerCase()
            .includes(searchInput.value.toLowerCase()) ||
          post.username
            .toLowerCase()
            .includes(searchInput.value.toLowerCase()) ||
          post.location.toLowerCase().includes(searchInput.value.toLowerCase())
      )
      .reverse();
  else if (sortType.value == "title_asc")
    return _.sortBy(posts.value, function (post: GetPostDto) {
      return post.title.toLowerCase();
    }).filter(
      (post: GetPostDto) =>
        post.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        post.description
          .toLowerCase()
          .includes(searchInput.value.toLowerCase()) ||
        post.username.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        post.location.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  else if (sortType.value == "title_desc")
    return _.sortBy(posts.value, function (post: GetPostDto) {
      return post.title.toLowerCase();
    })
      .filter(
        (post: GetPostDto) =>
          post.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
          post.description
            .toLowerCase()
            .includes(searchInput.value.toLowerCase()) ||
          post.username
            .toLowerCase()
            .includes(searchInput.value.toLowerCase()) ||
          post.location.toLowerCase().includes(searchInput.value.toLowerCase())
      )
      .reverse();

  return posts.value.filter(
    (post: GetPostDto) =>
      post.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      post.description
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      post.location.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      post.username.toLowerCase().includes(searchInput.value.toLowerCase())
  );
});

function updateView() {
  postService
    ?.getAllPosts(userId)
    .then((result) => {
      posts.value = result.data;
    })
    .catch((error) => console.log("error: " + error));
}

function sortPosts(type: string) {
  sortType.value = type;
}

//used for closing animation
function closeInput() {
  const searchContainer = document.getElementById("searchContainer");
  if (searchContainer) {
    searchContainer.classList.add("input-animation-closing");
    searchContainer.addEventListener("animationend", () => {
      searchContainer.classList.remove("input-animation-closing");
      isSearch.value = false;
      searchInput.value = "";
    });
  }
}
</script>

<style scoped>
.input-animation {
  animation-name: roll-out;
  animation-timing-function: ease-out;
  animation-duration: 0.4s;
  animation-iteration-count: 1;
}
.input-animation-closing {
  animation-name: roll-in;
  animation-timing-function: ease-out;
  animation-duration: 0.4s;
  animation-iteration-count: 1;
}

@keyframes roll-out {
  from {
    width: 0;
  }
  to {
    width: 24rem;
  }
}

@keyframes roll-in {
  from {
    width: 24rem;
  }
  to {
    width: 0;
  }
}
</style>
