<template>
  <div class="flex flex-col w-800 mx-auto mt-20">
    <div class="flex flex-row cursor-pointer hover:font-medium mb-4">
      <ChevronLeftIcon class="w-5 h-5" />
      <p @click="goBack()">back</p>
    </div>

    <div class="overflow-y-scroll">
      <!--POST-->
      <div class="w-f flex flex-col px-4 py-2 bg-white">
        <!--TOP BAR-->
        <div
          class="w-full flex flex-row space-x-10 pb-2 px-2 border-b-2 border-primary-grey/20 items-center"
        >
          <p class="text-sm text-black font-medium">{{ thePost.username }}</p>
          <div class="flex flex-row items-center space-x-2">
            <LocationMarkerIcon class="w-4 h-4 stroke-primary-grey stroke-2" />
            <p class="text-sm text-primary-grey font-medium">
              {{ thePost.location }}
            </p>
          </div>
          <p class="text-sm text-primary-grey font-medium whitespace-nowrap">
            {{ thePost.date }}
          </p>
        </div>

        <!--CONTENT-->
        <div
          class="flex flex-row w-full border-b-2 border-primary-grey/20 mt-2 pb-2 px-2"
        >
          <img v-if="imgSource != ''" :src="imgSource" class="w-2/8 h-full pr-2" />

          <div class="w-5/8 flex flex-col space-y-2">
            <h2 class="text-black text-xl font-bold">{{ thePost.title }}</h2>
            <p class="text-base text-black font-medium">
              {{ thePost.description }}
            </p>
          </div>
        </div>
        <p class="text-base text-black border-b-2 border-primary-grey/20 py-4 px-2">
          {{ thePost.text }}
        </p>

        <!--ACTIONS-->
        <div
          class="w-full flex flex-row justify-between border-b-2 border-primary-grey/20 mt-2 pb-2 px-2"
        >
          <div class="flex flex-row space-x-2 items-center">
            <div
              @click="savePost()"
              class="flex flex-row space-x-2 items-center mr-2 text-primary-grey stroke-primary-grey hover:stroke-black cursor-pointer hover:text-black"
            >
              <HeartIcon class="w-5 h-5" />
              <p class="text-base">favourite</p>
            </div>
            <div
              @click="isCommentPanelOpen = true"
              class="flex flex-row space-x-2 items-center text-primary-grey stroke-primary-grey hover:stroke-black cursor-pointer hover:text-black"
            >
              <AnnotationIcon class="w-5 h-5" />
              <p class="text-base">comment</p>
            </div>
          </div>

          <!--LIKES-->
          <div class="flex flex-row space-x-2 items-center">
            <ThumbUpIcon class="w-5 h-5 stroke-primary-grey cursor-pointer" />
            <p class="text-base text-primary-grey">{{ thePost.likes }}</p>
            <ThumbDownIcon class="w-5 h-5 stroke-primary-grey cursor-pointer" />
            <p class="text-base text-primary-grey">{{ thePost.dislikes }}</p>
          </div>
        </div>

        <!--TYPE COMMENT-->
        <div
          v-if="isCommentPanelOpen"
          class="w-full flex flex-row p-2 justify-between"
        >
          <div class="flex flex-col w-full">
            <div class="flex flex-row text-sm">
              <p class="font-medium text-black">you</p>
              <p class="px-1">·</p>
              <p class="text-primary-grey">{{ todaysDate }}</p>
            </div>

            <input
              v-model="newComment"
              placeholder="Type your comment here..."
              class="text-sm text-black focus:outline-none w-full"
            />
          </div>

          <div class="flex flex-row space-x-2 items-center">
            <button
              @click="submitComment(thePost.id)"
              class="bg-primary-orange text-white py-1 px-2 text-sm h-3/4"
            >
              send
            </button>
            <button
              @click="
                isCommentPanelOpen = false;
                newComment = '';
              "
              class="bg-primary-grey text-white py-1 px-2 text-sm h-3/4"
            >
              cancel
            </button>
          </div>
        </div>

        <!--COMMENTS-->
        <div class="w-full overflow-y-auto">
          <div v-for="(comment, index) in thePost.comments" v-bind:key="index">
            <Comment :the-comment="comment" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LocationMarkerIcon,
  HeartIcon,
  AnnotationIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  TrashIcon,
  PencilAltIcon,
  ChevronLeftIcon,
} from "@heroicons/vue/outline";
import router from "@/router";
import { computed, inject, ref } from "vue";
import Comment from "@/components/Comment.vue";
import type { PostService } from "@/services/PostService";
import type { CommentService } from "@/services/CommentService";
import { useRoute } from "vue-router";

const commentService = inject<CommentService>("commentService");
const postService = inject<PostService>("postService");

const thePost = ref();
const route = useRoute();
const postId = route.params.id;
const imgSource = ref('');

if (typeof postId === "string") {
  postService?.getPost(postId).then((result) => {
    thePost.value = result.data;
    const base64String = thePost.value.photo ? thePost.value.photo : "";
    const data_url =
        base64String != "" ? "data:image/png;base64," + base64String : "";
    imgSource.value = data_url;
  });
}

const newComment = ref("");
const isCommentPanelOpen = ref(false);
const todaysDate = computed(() => {
  const now = new Date();
  return now.toLocaleDateString();
});

function submitComment(postId: string) {
  console.log(thePost.value.userId);
  commentService
    ?.createComment({
      userId: thePost.value.userId,
      postId: postId,
      date: new Date(),
      text: newComment.value,
    })
    .then((result) => {
      if (result == true) {
        isCommentPanelOpen.value = false;
        newComment.value = "";
        postService
          ?.getPost(postId)
          .then((result) => (thePost.value = result));
      }
    })
    .catch((error) => {
      console.log("error: " + error);
    });
}

//adds to favourites
function savePost() {
  postService?.savePost({ userId: thePost.value.userId, postId: postId });
}

function goBack() {
  router.back();
}
</script>

<style scoped></style>
