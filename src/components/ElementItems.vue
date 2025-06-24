<script setup lang="ts">
import { getFileUrl } from '@/pocketbase.js'
import { useDraggable } from '@vueuse/core'
import { useTemplateRef, ref } from 'vue'
import {useBoards} from '@/useBoards'
const { deleteElement, editElement } = useBoards()

const props = defineProps({
  element: {
    type: Object,
    required: true,
  },
  currentUserId: {
    type: String,
    required: true,
  },
})

const el = useTemplateRef<HTMLElement>('el')
const startX = ref(props.element.x_position ?? 0)
const startY = ref(props.element.y_position ?? 0)


const { x, y, style } = useDraggable(el, {
  initialValue: { x: startX.value, y: startY.value },
  onEnd: () => {
    editElement(props.element.id, {
      x_position: Math.round(x.value),
      y_position: Math.round(y.value),
    })
  },
})

function handleDeleteElement() {
  if (confirm('Do you want to delete this element?')) {
    deleteElement(props.element.id)
  }
}
</script>

<template>
  <div ref="el" :style="style" style="position: absolute" class="group relative">
    <img
      draggable="false"
      v-if="element.type === 'image'"
      :src="element.imageUrl || getFileUrl(element.collectionId, element.id, element.url)"
      :style="` height: ${element.height ?? 150}px; `"
      class=""
    />
    <div
      v-if="element.type === 'color'"
      :style="`
          background-color: ${element.color};
          height: ${element.height ?? 150}px;
          width: ${element.width ?? 150}px;
          `"
    ></div>
    <p
      v-if="element.type === 'text'"
      v-html="element.text"
      class="bg-[#fafafa] p-1 rounded"
      :style="`
      color: ${element.color ?? '#000000'};
    `"
    ></p>
    <div v-if="element.type === 'song'" v-html="element.songUrl"></div>
    <div
      class="flex justify-between gap-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-b absolute top-1 left-1"
    >
      <div class="bg-[#fafafa] hover:bg-stone-200 p-1 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#706f6c"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="5 9 2 12 5 15" />
          <polyline points="9 5 12 2 15 5" />
          <polyline points="15 19 12 22 9 19" />
          <polyline points="19 9 22 12 19 15" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="12" y1="2" x2="12" y2="22" />
        </svg>
      </div>

      <button @click="handleDeleteElement" class="bg-[#fafafa] hover:bg-stone-200 p-1 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          stroke="#706f6c"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          viewBox="0 0 24 24"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style></style>
