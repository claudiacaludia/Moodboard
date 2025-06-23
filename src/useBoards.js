import { ref, readonly, onMounted } from 'vue'
import { pb } from './pocketbase.js'
import { useLogin } from '@/useLogin.js'
import { useElements } from '@/useElements.js'
import { useWebNotification } from '@vueuse/core'

const boards = ref(null)
const currentBoard = ref(null)

export function useBoards() {
  const { currentUser } = useLogin()
  const { fetchElements, subscribeToElements } = useElements()

  const setBoard = async (boardId) => {
    const foundBoard = boards.value.find(board => board.id === boardId)
    if (foundBoard) {
      currentBoard.value = foundBoard
      localStorage.currentBoard = JSON.stringify(foundBoard)
      await fetchElements(boardId)
      await subscribeToElements(boardId)
    }
  }

  const resetBoard = () => {
    currentBoard.value = null
    localStorage.removeItem('currentBoard')
  }

  const fetchBoards = async () => {
    boards.value = await pb.collection('boards').getFullList({ expand: 'members' })
    const savedCurrentBoard = JSON.parse(localStorage.currentBoard ?? 'null')
    if (savedCurrentBoard) await setBoard(savedCurrentBoard.id)
  }

  const createBoard = async (title) => {
    const newBoard = {
      user: currentUser.value?.id,
      title: title
    }
    const { show } = useWebNotification({
      title: 'Neues Moodboard erstellt!',
      body: `Board "${title}" wurde erfolgreich angelegt.`,
      tag: 'new-board',
      renotify: true
    })

    const createdBoard = await pb.collection('boards').create(newBoard)
    boards.value = [...boards.value, createdBoard]
    show()
  }

  return {
    boards: readonly(boards),
    currentBoard: readonly(currentBoard),
    fetchBoards,
    setBoard,
    resetBoard,
    createBoard
  }
}
