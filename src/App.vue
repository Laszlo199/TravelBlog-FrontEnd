<script setup lang="ts">
import SideMenu from "@/components/SideMenu.vue";
import { useRouter } from "vue-router";
import { provide } from "vue";
import { PostService } from "@/services/PostService";
import { CommentService } from "@/services/CommentService";
import Notification from "@/components/Notification.vue";
import NotificationsView from "@/views/NotificationsView.vue";
const myRouter: any = useRouter();
provide("postService", new PostService());
provide("commentService", new CommentService());
</script>

<template>
  <div class="flex flex-row w-screen h-screen bg-background-grey">
    <SideMenu />
    <RouterView />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
