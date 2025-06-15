<script setup>
import { onMounted, ref } from 'vue'
import Modal from '@/components/Modal.vue'
//import { useLogin } from '@/useLogin.js'
import BoardListItem from '@/components/BoardListItem.vue'
import { useBoards } from '@/useBoards.js'
import { useRouter } from 'vue-router'
//const {currentUser} = useLogin();
const {fetchBoards, boards, setBoard} = useBoards();
const router = useRouter();

//const newBoardName = ref('');
//const newBoardImageInput = ref(null);

onMounted(() => {
  fetchBoards();
});

function handelCreatBoard() {
  /*if(!newBoardName.value) {
    alert('Bitte Chat Name eingeben');
    return;
  }
  /!*const images = newBoardImageInput.value?.files[0];
  creatBoard(newBoardName.value, [currentUser.value.id], images);*!/ //TODO creatBoard
  newBoardName.value = '';*/
}

function handleSetBoard(boardId) {
  setBoard(boardId)
}

</script>

<template>
<!--  <div class="navbar flex justify-between bg-stone-200 py-6">
&lt;!&ndash;    <h1>Hallo {{currentUser?.name}} </h1>&ndash;&gt;
    <h2 class="text-blue-950 font-bold">Dreamnest</h2>
    <img src="../assets/img/logo.png" class="w-16 h-16">

    <RouterLink @click="logout" to="/" class="btn btn-outline btn-primary">Logout</RouterLink>
  </div>-->


  <div class="navbar bg-base-100 shadow-sm text-blue-950">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><a>About</a></li>
          <li>
            <a>Boards</a>
            <ul class="p-2 z-10">
              <!--              <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>-->
              <BoardListItem v-for="board in boards" :key="board.id" :board="board" @click="handleSetBoard(board.id)"/>
            </ul>
          </li>
        </ul>
      </div>
      <img src="../assets/img/logo.png" alt="logo dreamnest" class="w-16 h-16 mr-4">
<!--      <p>Dreamnest</p>-->
      <p></p>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a @click="router.push('/about');">About</a></li>
        <li>
          <details>
            <summary @click="router.push('/home');">Boards</summary>
            <ul class="p-2 z-10">
<!--              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>-->
              <BoardListItem v-for="board in boards" :key="board.id" :board="board" @click="handleSetBoard(board.id)"/>
            </ul>
          </details>
        </li>
        <Modal btnClass="btn btn-ghost btn-sm" btnText="Creat new Moodboard">
          <div class="flex flex-col gap-5">
            <h2 class="text-lg font-bold">
              Creat Moodboard
            </h2>

            <label class="floating-label w-full">
              <span>Name</span>
              <input v-model="newBoardName" type="text" placeholder="Board Name" class="input input-sm w-full"/>
            </label>

            <label class="floating-label w-full">
              <span>Image</span>
              <input ref="newChatImageInput" type="file" class="file-input file-input-sm file-input-ghost w-full"/>
            </label>

            <button class="btn btn-primary" @click="handelCreatBoard">Create new Board</button>
          </div>
        </Modal>
      </ul>
    </div>
    <div class="navbar-end">
      <RouterLink @click="logout" to="/" class="btn btn-outline btn-primary">Logout</RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>
