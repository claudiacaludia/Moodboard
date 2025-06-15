<script setup>
import { onMounted, ref } from 'vue'
import Modal from '@/components/Modal.vue'
//import { useLogin } from '@/useLogin.js'
import BoardListItem from '@/components/BoardListItem.vue'
import { useBoards } from '@/useBoards.js'
//const {currentUser} = useLogin();
const {fetchBoards, boards, setBoard} = useBoards();

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
  <ul class="list bg-base-100 rounded-box shadow-md">

    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between items-center">
      <div>
        <h2>Moodboards</h2>
      </div>
      <div>
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
      </div>
    </li>
    <BoardListItem v-for="board in boards" :key="board.id" :board="board" @click="handleSetBoard(board.id)"/>

<!--    <ChatListItem v-for="chat in chats" :key="chat.id" @click="handleSetChat(chat.id)" :chat="chat"/>-->

  </ul>
</template>
