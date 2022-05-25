<template>
  <div class="w-800 flex flex-col px-4 py-2 bg-white">
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
      <p class="text-sm text-primary-grey font-medium whitespace-nowrap">{{ postDate }}</p>

      <!--EDIT / DELETE-->
      <div v-if="viewType=='MYPOSTS'" class="w-full flex flex-row justify-between">
        <p class="text-sm text-primary-orange">{{ thePost.isPrivate ? 'private' : 'public' }}</p>
        <div class="flex flex-row space-x-2">
          <PencilAltIcon @click="editPost()" class="w-6 h-6 stroke-primary-grey stroke-2 cursor-pointer hover:stroke-black" />
          <TrashIcon @click="isDeleting=!isDeleting;" class="w-6 h-6 stroke-primary-grey stroke-2 cursor-pointer hover:stroke-black" />
          <p v-if="isDeleting" @click="deletePost()" class="cursor-pointer text-primary-red hover:underline underline-offset-4">click here to delete</p>
        </div>
      </div>
    </div>

    <!--CONTENT-->
    <div class="flex flex-row w-full border-b-2 border-primary-grey/20 mt-2 pb-2">
      <img v-if="imgSource != ''" :src="imgSource"
          class="w-2/8 h-full"/>
      <div class="w-5/8 flex flex-col space-y-2 ml-2">
        <h2 class="text-black text-xl font-bold">{{ thePost.title }}</h2>
        <p v-if="thePost.description.length>0" class="text-base text-black">{{ thePost.description }}</p>
        <p v-if="thePost.description.length<200" class="text-base text-black post-text-wrap italic">{{ thePost.text }}</p>
        <RouterLink :to="{ name: 'read-more', params: { id: thePost.id } }">
          <p class="text-base text-medium text-primary-orange font-medium cursor-pointer">Read more</p>
        </RouterLink>
      </div>
    </div>

    <!--ACTIONS-->
    <div
      class="w-full flex flex-row justify-between border-b-2 border-primary-grey/20 mt-2 pb-2 px-2"
    >
      <div class="flex flex-row space-x-2 items-center">
        <div
          @click="likePost();"
          class="flex flex-row space-x-2 items-center mr-2 text-primary-grey stroke-primary-grey hover:stroke-black cursor-pointer hover:text-black"
        >
          <HeartIcon
            v-bind:class="{ 'fill-primary-grey': viewType == 'FAVOURITEPOSTS' }"
            class="w-5 h-5"
          />
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
        <ThumbUpIcon  class="w-5 h-5 stroke-primary-grey cursor-pointer" />
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

        <input type="text" v-model="newComment" placeholder="Type your comment here..."
               class="text-sm text-black focus:outline-none w-full" />
      </div>

      <div class="flex flex-row space-x-2 items-center">
        <button
          @click="submitComment(thePost.id); sendNotification('comment')"
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
    <div class="w-full max-h-36 overflow-y-auto">
      <div v-for="comment in _.sortBy(thePost.comments,['date']).reverse()">
        <Comment :the-comment="comment"/>
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
} from "@heroicons/vue/outline";
import Comment from "@/components/Comment.vue";
import {computed, inject, ref, toRefs} from "vue";
import type {GetPostDto} from "@/Dtos/get.post.dto";
import type { PostService } from "@/services/PostService";
import type { CommentService } from "@/services/CommentService";
import moment from "moment";
import * as _ from "underscore";
import { AuthStore } from "@/stores/auth.store";
import { NotificationsStore } from "@/stores/notifications";

const commentService = inject<CommentService>("commentService");
const postService = inject<PostService>("postService");
const authStore = AuthStore();
const userId = authStore.getUserid;

const props = defineProps<{
  thePost: GetPostDto;
  //depending on the view type (my posts / search posts) we get different elements in post component
  viewType: string;
}>();

const emit = defineEmits(["refresh"]);

const newComment = ref("");
const isCommentPanelOpen = ref(false);
const notificationsStore = NotificationsStore();
const isDeleting = ref(false);
const todaysDate = computed( () => {
  const now = new Date();
  return now.toLocaleDateString();
});

const base64String = (props.thePost.photo) ?
    props.thePost.photo : '';
const data_url = (base64String!='') ? "data:image/png;base64," + base64String : '';
const imgSource = ref(data_url);

const postDate = computed( () => {
  return moment(String(props.thePost.date)).format('DD/MM/YYYY');
});

function sendNotification(type: string) {
  let noti = {
    postName: props.thePost.title,
    userId: userId,
    userName: "user",
    notificationType: type,
    date: new Date(Date.now()),
    text: newComment.value
  };
  notificationsStore.createNotification(noti);
}

function submitComment(postId: string) {
  commentService
    ?.createComment({
      userId: userId,
      postId: postId,
      date: new Date(),
      text: newComment.value,
    })
    .then((result) => {
      if (result == true) {
        isCommentPanelOpen.value = false;
        newComment.value = "";
        emit("refresh");

      }
    })
    .catch((error) => {
      console.log("error: " + error);
    });
}

function editPost() {
  //TODO implement edit post
}

function deletePost() {
  postService?.deletePost(props.thePost.id).then((result) => {
    if(result.data) {
      isDeleting.value = false;
      emit('refresh');
    }
  });
}

//adds to favourites
function likePost() {
  postService?.likePost({ userId: userId, postId: props.thePost.id })
  .then(()=>{
    sendNotification('favourite')
  });
}


</script>

<style scoped>
.post-text-wrap {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
