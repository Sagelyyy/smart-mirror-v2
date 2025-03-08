<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style>
::-webkit-scrollbar {
  display: none !important;
}

* {
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
}
</style>
