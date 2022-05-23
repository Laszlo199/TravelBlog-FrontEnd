<template>
  <div class="relative inline-block text-left w-24px z-10">
    <!--BUTTON-->
    <div @click="toggleDropdown()" class="hover:cursor-pointer">
      <button>
        <DotsVerticalIcon class="h-5 w-5 hover:cursor-pointer"/>
      </button>
    </div>

    <!--DROPDOWN-->
      <div v-if="isVisible" class="w-48 bg-white text-right origin-top-right absolute right-0 mt-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
           role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
          <div class="text-black block px-4 py-2 font-medium text-md border-b-2 border-black">
            Sort
          </div>

          <button @click="$emit('sort', 'date_desc'); toggleDropdown()"
                  class="px-4 py-2 text-sm hover:text-primary-orange"
                  role="menuitem" tabindex="-1" id="menu-item-1">
            <div class="flex flex-row justify-end items-center">
              <p class="px-2">Date newest</p>
              <CalendarIcon class="h-5 w-5"/>
            </div>
          </button>

          <button @click="$emit('sort', 'date_asc'); toggleDropdown()"
                  class="px-4 py-2 text-sm hover:text-primary-orange"
                  role="menuitem" tabindex="-1" id="menu-item-2">
            <div class="flex flex-row justify-end items-center">
              <p class="px-2">Date oldest</p>
              <CalendarIcon class="h-5 w-5"/>
            </div>
          </button>

          <button @click="$emit('sort', 'title_asc'); toggleDropdown()"
                  class="px-4 py-2 text-sm hover:text-primary-orange"
                  role="menuitem" tabindex="-1" id="menu-item-3">
            <div class="flex flex-row justify-end items-center">
              <p class="px-2">Title A-Z</p>
              <SortDescendingIcon class="h-5 w-5"/>
            </div>
          </button>

          <button @click="$emit('sort', 'title_desc'); toggleDropdown()"
                  class="px-4 py-2 text-sm hover:text-primary-orange"
                  role="menuitem" tabindex="-1" id="menu-item-4">
            <div class="flex flex-row justify-end items-center">
              <p class="px-2">Title Z-A</p>
              <SortAscendingIcon class="h-5 w-5"/>
            </div>
          </button>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {UsersIcon, SortDescendingIcon, DotsVerticalIcon, SortAscendingIcon, CalendarIcon} from "@heroicons/vue/outline";

const isDropdown = ref(false);

function toggleDropdown() {
  isDropdown.value = !isDropdown.value;
}

const isVisible = computed(()=> {
  return isDropdown.value;
})
</script>

<style scoped>

</style>