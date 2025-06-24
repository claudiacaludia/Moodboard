<script setup>
import { onMounted, ref } from 'vue'
import Modal from '@/components/Modal.vue'
import BoardListItem from '@/components/BoardListItem.vue'
import { useBoards } from '@/useBoards.js'
import { useRouter } from 'vue-router'
const {fetchBoards, boards, setBoard, createBoard} = useBoards();
const router = useRouter();

const newBoardName = ref('');

onMounted(() => {
  fetchBoards();
});

function handelCreatBoard() {
  if(!newBoardName.value) {
    alert('Bitte Chat Name eingeben');
    return;
  }
  createBoard(newBoardName.value,);
  newBoardName.value = '';
}

function handleSetBoard(boardId) {
  setBoard(boardId)
}

</script>

<template>


  <div class="navbar bg-base-100 shadow-sm text-blue-950">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><a @click="router.push('/about');">About</a></li>
          <li>
            <a @click="router.push('/home');">☁️ Moodboards</a>
            <ul class="p-2 z-10">
              <BoardListItem v-for="board in boards" :key="board.id" :board="board" @click="handleSetBoard(board.id)"/>
            </ul>
          </li>
        </ul>
      </div>
      <p class="text-blue-950 text-2xl font-bold padding-3 display-inline-flex align-center gap-2">☁️ MoodCloud</p>
      <p></p>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a @click="router.push('/about');">About</a></li>
        <li>
          <details>
            <summary @click="router.push('/home');">MoodClouds</summary>
            <ul class="p-2 z-10">
              <BoardListItem v-for="board in boards" :key="board.id" :board="board" @click="handleSetBoard(board.id)"/>
            </ul>
          </details>
        </li>
        <Modal btnClass="btn btn-sm" btnText="Creat new cloud">
          <div class="flex flex-col gap-5">
            <h2 class="text-lg font-bold">
              Creat MoodCloud
            </h2>

            <label class="floating-label w-full">
              <span>Name</span>
              <input v-model="newBoardName" type="text" placeholder="Board Name" class="input input-sm w-full"/>
            </label>

            <button class="btn btn-primary" @click="handelCreatBoard">Create new Cloud</button>
          </div>
        </Modal>
      </ul>
    </div>
    <div class="navbar-end">
      <RouterLink @click="logout" to="/" class="btn btn-outline btn-primary">Logout</RouterLink>
    </div>
  </div>
</template>
