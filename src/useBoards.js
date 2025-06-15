import {pb} from './pocketbase.js'
import { useLogin } from '@/useLogin.js'
import { readonly, ref } from 'vue'
const boards = ref(null);
const currentBoard = ref(null);
const elements = ref(null);
export function useBoards() {

  const {currentUser} = useLogin();


  const setBoard = async (boardId) => {
    const foundBoard = boards.value.find(board => board.id === boardId);
    if(foundBoard) {
      currentBoard.value = foundBoard;
      localStorage.currentBoard = JSON.stringify(foundBoard);
      //Inhalt laden
      console.log("boardID: ",boardId);
      elements.value = await pb.collection('elements').getFullList( {
        filter: ` board = "${boardId}"`,
        //filter: `"${boardId}" ~ board`,
        expand: 'user' //TODO: brauchi des?
      });
      console.log("Elements:",elements.value);
      console.log("Inhalt für Board",foundBoard);
    }
  }



  const fetchBoards = async () => {
    boards.value = await pb.collection('boards').getFullList({
      expand: 'members'
    });
    console.log('Boards fetched: ', boards.value);

    const savedCurrentBoards = JSON.parse(localStorage.currentBoard ?? 'null') ?? null;
    if (savedCurrentBoards) {
      await setBoard(savedCurrentBoards.id);
      console.log('Loaded last current board')
    }
  }

  return {
    boards: readonly(boards),
    elements: readonly(elements),
    fetchBoards,
    setBoard,
    currentBoard: readonly(currentBoard),
  }
}
