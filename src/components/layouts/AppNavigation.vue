<script setup>

import Navbar from "@/components/Navbar.vue";

</script>

<template>

  <header>
    <slot name="header">
      <Navbar></Navbar>
    </slot>
  </header>

  <main class="">
    <div class="pt-0 min-h-screen">
      <div class=" h-full">
        <slot>
          Your content goes here
        </slot>
      </div>
    </div>
  </main>

  <footer>
    <slot name="footer">
    </slot>
  </footer>

</template>

<style scoped>

</style>
