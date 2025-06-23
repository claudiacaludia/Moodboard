import { ref, readonly } from 'vue'
import { pb } from './pocketbase.js'
import { useLogin } from '@/useLogin.js'

const elements = ref(null)

export function useElements() {
  const { currentUser } = useLogin()

  const fetchElements = async (boardId) => {
    if (!boardId) return []
    elements.value = await pb.collection('elements').getFullList({
      filter: `board = "${boardId}"`,
      expand: 'user'
    })
  }

  const subscribeToElements = async (boardId) => {
    await pb.collection("elements").unsubscribe("*")

    await pb.collection("elements").subscribe("*", (elementEvent) => {
      if (elementEvent.action === 'create' && elementEvent.record.board === boardId) {
        elements.value = [...(elements.value ?? []), elementEvent.record]
      }
      if (elementEvent.action === 'delete') {
        elements.value = elements.value.filter(el => el.id !== elementEvent.record.id)
      }
      if (elementEvent.action === 'update') {
        elements.value = elements.value.map(el =>
          el.id === elementEvent.record.id ? elementEvent.record : el
        )
      }
    })
  }

  const createElement = async (xPos, yPos, height, width, type, text, color, song, image, imageUrl, boardId) => {
    const newElement = {
      x_position: xPos,
      y_position: yPos,
      height,
      width,
      type,
      text,
      color,
      songUrl: song,
      board: boardId,
      user: currentUser.value?.id,
      url: image,
      imageUrl
    }
    await pb.collection('elements').create(newElement)
  }

  const deleteElement = async (elementId) => {
    try {
      await pb.collection('elements').delete(elementId)
    } catch (err) {
      console.error('Error deleting element:', err)
    }
  }

  const editElement = async (elementId, updatedFields) => {
    try {
      await pb.collection('elements').update(elementId, updatedFields)
    } catch (err) {
      console.error('Error updating element:', err)
    }
  }

  return {
    elements: readonly(elements),
    fetchElements,
    subscribeToElements,
    createElement,
    deleteElement,
    editElement
  }
}
