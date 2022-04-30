<template>
  <div class="w-800 flex flex-col px-4 py-2 bg-white">
    <!--TOP BAR-->
    <div class="w-full flex flex-row space-x-10 pb-2 px-2 border-b-2 border-primary-grey/20 items-center">
      <p class="text-sm text-black font-medium">{{ username }}</p>
      <div class="flex flex-row items-center space-x-2">
        <LocationMarkerIcon class="w-4 h-4 stroke-primary-grey stroke-2" />
        <p class="text-sm text-primary-grey font-medium">{{ location }}</p>
      </div>
      <p class="text-sm text-primary-grey font-medium">{{ date }}</p>
    </div>

    <!--CONTENT-->
    <div class="flex flex-row w-full border-b-2 border-primary-grey/20 mt-2 pb-2 px-2">
      <div class="w-2/8 h-full bg-primary-orange">img</div>
      <div class="w-5/8 flex flex-col space-y-2 ml-2">
        <h2 class="text-black text-xl font-bold">{{ header }}</h2>
        <p class="text-base text-black post-text-wrap">{{ text }}</p>
        <p class="text-base text-medium text-primary-orange font-medium cursor-pointer">Read more</p>
      </div>
    </div>

    <!--ACTIONS-->
    <div class="w-full flex flex-row justify-between border-b-2 border-primary-grey/20 mt-2 pb-2 px-2">
      <div class="flex flex-row space-x-2 items-center">
        <div class="flex flex-row space-x-2 items-center mr-2 text-primary-grey stroke-primary-grey hover:stroke-black cursor-pointer hover:text-black">
          <HeartIcon class="w-5 h-5"/>
          <p class="text-base">favourite</p>
        </div>
        <div @click="isCommentPanelOpen=true;" class="flex flex-row space-x-2 items-center text-primary-grey stroke-primary-grey hover:stroke-black cursor-pointer hover:text-black">
          <AnnotationIcon class="w-5 h-5"/>
          <p class="text-base">comment</p>
        </div>
      </div>

      <!--LIKES-->
      <div class="flex flex-row space-x-2 items-center">
        <ThumbUpIcon class="w-5 h-5 stroke-primary-grey cursor-pointer"/>
        <p class="text-base text-primary-grey">{{ likes }}</p>
        <ThumbDownIcon class="w-5 h-5 stroke-primary-grey cursor-pointer"/>
        <p class="text-base text-primary-grey">{{ dislikes }}</p>
      </div>
    </div>

    <!--TYPE COMMENT-->
    <div v-if="isCommentPanelOpen" class="w-full flex flex-row p-2 justify-between">
      <div class="flex flex-col w-full">
        <div class="flex flex-row text-sm">
          <p class="font-medium text-black">you</p>
          <p class="px-1"> · </p>
          <p class="text-primary-grey">{{ todaysDate }}</p>
        </div>

        <input v-model="newComment" placeholder="Type your comment here..." class="text-sm text-black focus:outline-none w-full" />
      </div>

      <div class="flex flex-row space-x-2 items-center">
        <button @click="submitComment()" class="bg-primary-orange text-white py-1 px-2 text-sm h-3/4">send</button>
        <button @click="isCommentPanelOpen=false; newComment=''; " class="bg-primary-grey text-white py-1 px-2 text-sm h-3/4">cancel</button>
      </div>
    </div>

    <!--COMMENTS-->
    <Comment/>
    <Comment/>
  </div>

</template>

<script setup lang="ts">
import {LocationMarkerIcon, HeartIcon, AnnotationIcon, ThumbDownIcon, ThumbUpIcon} from "@heroicons/vue/outline";
import Comment from "@/components/Comment.vue";
import {computed, ref} from "vue";

const username = 'johny334';
const location = 'Rome, Italy';
const date = '20/03/2020';
const header = 'Best donuts ever';
const text = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptate'
const likes = 12;
const dislikes = 3;

const newComment = ref("");
const isCommentPanelOpen = ref(false);
const todaysDate = computed( () => {
  const now = new Date();
  return now.toLocaleDateString();
});

function submitComment() {
  //TODO implement create comment
}

</script>

<style scoped>

.post-text-wrap {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>