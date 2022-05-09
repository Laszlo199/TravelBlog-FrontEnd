<template>
  <div class="w-full flex flex-col p-2">
    <div class="flex flex-row text-sm">
      <p class="font-medium text-black">{{ theComment.username }}</p>
      <p class="px-1"> · </p>
      <p class="text-primary-grey">{{ theComment.date }}</p>
    </div>

    <p class="text-sm text-black">{{ theComment.text }}</p>
  </div>

</template>

<script setup lang="ts">
import type {GetCommentDto} from "@/Dtos/get.comment.dto";

const props = defineProps<{
  theComment:GetCommentDto
}>();

</script>

<style scoped>

</style>