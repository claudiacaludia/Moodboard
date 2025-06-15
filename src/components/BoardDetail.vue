<script setup>
import { useBoards } from '@/useBoards.js'
import { getFileUrl } from '@/pocketbase.js'
import ElementItems from '@/components/ElementItems.vue'
import { useLogin } from '@/useLogin.js'

const {currentBoard, elements} = useBoards();
const {currentUser} = useLogin();
</script>

<template>
  <div v-if="!currentBoard">
    <p>Wähle ein Board aus</p>
  </div>
  <div v-if="currentBoard" class="w-full ">
    <h1 class="text-center text-4xl bg-stone-100 py-4"> {{currentBoard.title}}</h1>
    <div v-if="elements" class=" w-full h-screen bg-stone-100"> <!--  relative-->
        <ElementItems v-for="element in elements" :key="element.id" :currentUserId="currentUser?.id ?? ''" :element="element"></ElementItems>
    </div>
      <p v-if="!elements" >Wo sind die Elemente</p>
  </div>

</template>

<style scoped>

</style>
