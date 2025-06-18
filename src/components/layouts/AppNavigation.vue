<script setup>

import Navbar from "@/components/Navbar.vue";

</script>

<template>

  <header>
    <slot name="header">
      <Navbar></Navbar>
    </slot>
  </header>

  <main class="background">
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
.background {
  background-image: url('/src/assets/img/clouds2.png');
  background-color: rgba(174, 162, 149, 0.3); /* leichter, beiger Overlay */
  background-blend-mode: lighten;
  background-size: contain;
  background-repeat: repeat;
  min-height: 100vh;
}
</style>
