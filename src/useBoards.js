import {pb} from './pocketbase.js'
import { useLogin } from '@/useLogin.js'
import { readonly, ref } from 'vue'
import { onMounted } from 'vue'
import {useWebNotification} from "@vueuse/core";

const boards = ref(null);
const currentBoard = ref(null);
const elements = ref(null);
export function useBoards() {

  const {currentUser} = useLogin();

  onMounted(async () => {
    // Lade alle Boards (inkl. setBoard falls localStorage vorhanden)
    await fetchBoards();

    await pb.collection("elements").unsubscribe("*");

    await pb.collection("elements").subscribe("*", async function (elementEvent) {

      if (elementEvent.action === 'create' && elementEvent.record.board === currentBoard.value?.id) {
        elements.value = [...elements.value, elementEvent.record];
      }

      if (elementEvent.action === 'delete') {
        elements.value = elements.value.filter(el => el.id !== elementEvent.record.id);
      }

      if (elementEvent.action === 'update') {
        elements.value = elements.value.map(el =>
          el.id === elementEvent.record.id ? elementEvent.record : el
        );
      }
    });
  });


  const setBoard = async (boardId) => {
    const foundBoard = boards.value.find(board => board.id === boardId);
    if(foundBoard) {
      currentBoard.value = foundBoard;
      localStorage.currentBoard = JSON.stringify(foundBoard);
      //Inhalt laden
      elements.value = await pb.collection('elements').getFullList( {
        filter: ` board = "${boardId}"`,
        expand: 'user' //TODO: brauchi des?
      });
    }
  }

  const resetBoard = () => {
    currentBoard.value = null;
    localStorage.removeItem('currentBoard');
    elements.value = null;
  };


  const fetchBoards = async () => {
    boards.value = await pb.collection('boards').getFullList({
      expand: 'members'
    });
    console.log('Boards fetched: ', boards.value);

    const savedCurrentBoards = JSON.parse(localStorage.currentBoard ?? 'null') ?? null;
    if (savedCurrentBoards) {
      await setBoard(savedCurrentBoards.id);
    }
  }

  const createBoard = async(title) => {
    const newBoard = {
      user: currentUser.value?.id,
      title: title,
    };
    const { show } = useWebNotification({
      title: 'Neues Moodboard erstellt!',
      body: `Board "${createdBoard.title}" wurde erfolgreich angelegt.`,
      tag: 'new-board',
      renotify: true,
    });
    const createdBoard = await pb.collection('boards').create(newBoard);
    console.log('Board created: ', newBoard)
    boards.value = [...boards.value, createdBoard];

    show();
  }

  const createElement = async (xPos, yPos, height, width, type, text, color, song, image, imageUrl) => {
    const newElement = {
      x_position: xPos,
      y_position: yPos,
      height: height,
      width: width,
      type: type,
      text: text,
      color: color,
      songUrl : song,
      board: currentBoard.value?.id,
      user: currentUser.value?.id,
      url: image,
      imageUrl: imageUrl,
    };
    await pb.collection('elements').create(newElement);
  }

  const deleteElement = async(elementId) => {
    if (!elementId) return;
    try {
      await pb.collection('elements').delete(elementId);
    } catch (err) {
      console.error('Error deleting element:', err);
    }
  }

  const editElement = async (elementId, updatedFields) => {
    if (!elementId || !updatedFields) return;
    try {
      await pb.collection('elements').update(elementId, updatedFields);

    } catch (err) {
      console.error('Error updating element:', err);
    }
  }



  return {
    boards: readonly(boards),
    elements: readonly(elements),
    fetchBoards,
    setBoard,
    resetBoard,
    createBoard,
    createElement,
    deleteElement,
    editElement,
    currentBoard: readonly(currentBoard),
  }
}
