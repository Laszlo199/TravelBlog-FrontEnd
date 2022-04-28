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
        <p class="text-base text-medium text-primary-orange font-medium">Read more</p>
      </div>
    </div>

    <!--ACTIONS-->
    <div class="w-full flex flex-row justify-between border-b-2 border-primary-grey/20 mt-2 pb-2 px-2">
      <div class="flex flex-row space-x-2 items-center">
        <div class="flex flex-row space-x-2 items-center mr-2">
          <HeartIcon class="w-5 h-5 stroke-primary-grey"/>
          <p class="text-base text-primary-grey">favourite</p>
        </div>
        <AnnotationIcon class="w-5 h-5 stroke-primary-grey"/>
        <p class="text-base text-primary-grey">comment</p>
      </div>

      <!--LIKES-->
      <div class="flex flex-row space-x-2 items-center">
        <ThumbUpIcon class="w-5 h-5 stroke-primary-grey"/>
        <p class="text-base text-primary-grey">{{ likes }}</p>
        <ThumbDownIcon class="w-5 h-5 stroke-primary-grey"/>
        <p class="text-base text-primary-grey">{{ dislikes }}</p>
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

const username = 'johny334';
const location = 'Rome, Italy';
const date = '20/03/2020';
const header = 'Best donuts ever';
const text = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptate'
const likes = 12;
const dislikes = 3;

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