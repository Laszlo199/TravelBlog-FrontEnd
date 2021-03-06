<template>
  <div class="flex flex-col h-screen w-800 mx-auto">
    <h1 class="text-4xl text-primary-orange font-bold mt-20 mb-4">Add post</h1>

    <!--PRIVATE / PUBLIC -->
    <div class="flex flex-row items-center mb-4 space-x-4">
      <input
        type="checkbox"
        class="checked:bg-primary-orange"
        v-model="isPrivate"
        :disabled="isCreated"
      />
      <p>private</p>
    </div>

    <!--INPUTS -->
    <div class="flex flex-row space-x-4 mb-4">
      <div
        class="w-1/2 py-2 px-4 bg-white flex flex-row items-center justify-between"
      >
        <input
          class="w-full placeholder:text-primary-grey text-black text-sm font-medium w-full focus:outline-none"
          placeholder="Title"
          v-model="title"
          :disabled="isCreated"
        />
      </div>

      <div
        class="w-1/2 py-2 px-4 bg-white flex flex-row items-center justify-between"
      >
        <input
          class="placeholder:text-primary-grey text-black text-sm w-full font-medium focus:outline-none"
          placeholder="Location..."
          v-model="location"
        />
        <LocationMarkerIcon class="w-5 h-5 stroke-primary-grey" />
      </div>
    </div>

    <div class="w-full mb-4 py-2 px-4 bg-white">
      <input
        class="placeholder:text-primary-grey text-black text-sm w-full focus:outline-none"
        placeholder="Description (optional)"
        v-model="description"
        :disabled="isCreated"
      />
    </div>

    <div class="w-full h-48 mb-4 py-2 px-4 bg-white">
      <textarea
        class="placeholder:text-primary-grey text-black text-sm w-full h-full focus:outline-none"
        placeholder="Write here..."
        v-model="text"
        :disabled="isCreated"
      ></textarea>
    </div>

    <!--FILE UPLOAD-->
    <input
      @change="onFileSelected($event)"
      type="file"
      accept="image/*"
      class="mb-4 file:bg-white file:border-none hover:file:text-primary-orange hover:file:cursor-pointer"
    />

    <!--BUTTON-->
    <button
      @click="submitPost()"
      :disabled="isCreated"
      class="bg-primary-orange text-white py-1 px-2 text-base mb-4"
    >
      send
    </button>

    <!--FEEDBACK-->
    <div
      v-if="isCreated"
      class="font-medium w-full text-center"
    >
      <p class="italic text-sm text-primary-grey">Your post has been created!</p>
      <RouterLink :to="{ name: 'read-more', params: { id: newId } }">
        <p class="hover:underline underline-offset-4 text-black cursor-pointer py-1 px-2 text-lg">Go to post</p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LocationMarkerIcon } from "@heroicons/vue/outline";
import { inject, ref } from "vue";
import { PostService } from "@/services/PostService";
import { AuthStore } from "@/stores/auth.store";


const postService = inject<PostService>("postService");
const authStore = AuthStore();
const userId = authStore.getUserid;

const title = ref("");
const description = ref("");
const text = ref("");
const isPrivate = ref(false);
const location = ref("");
let photo: File;

const isCreated = ref(false);
const newId = ref('');

function submitPost() {
  if (
    title.value.length > 2 &&
    text.value.length > 2 &&
    location.value.length > 2
  ) {
    const fd = new FormData();
    if(photo && photo.name) fd.append('file', photo, photo.name)

    postService
      ?.createPost({
        userId: userId,
        title: title.value,
        description: description.value,
        text: text.value,
        isPrivate: isPrivate.value,
        location: location.value,
        date: new Date(),
      }, fd)
      .then((result: string) => {
        newId.value = result;
        isCreated.value = true;
      });
  }
}

function onFileSelected(event: Event) {
  photo = event?.target?.files[0];
}
</script>

<style scoped></style>
