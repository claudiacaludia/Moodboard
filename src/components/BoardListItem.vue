<script setup>
defineProps({
  board: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <li><a class="">{{ board.title }}</a></li>
</template>
