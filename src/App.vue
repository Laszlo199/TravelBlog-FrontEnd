<script setup lang="ts">
import SideMenu from "@/components/SideMenu.vue";
import { useRouter } from "vue-router";
import { AuthStore } from "@/stores/auth.store";
import {provide} from "vue";
import {PostService} from "@/services/PostService";
import {CommentService} from "@/services/CommentService";

provide("postService", new PostService());
provide("commentService", new CommentService());

const myRouter: any = useRouter();
const authStore = AuthStore();

</script>

<template>
  <div class="flex flex-row w-screen h-screen bg-background-grey">
    <SideMenu v-show="authStore.isAuthenticated" />
    <RouterView class="pb-10"/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
