<template>
  <AppNavigation>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </AppNavigation>
  <div ref="el" :style="style" style="position: fixed">
    Drag me! I am at {{ x }}, {{ y }}
  </div>
</template>

<style>
</style>
<script setup lang="ts">
import AppNavigation from '@/components/layouts/AppNavigation.vue'
import { useDraggable } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const el = useTemplateRef<HTMLElement>('el')

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 110, y: 110 },
})
</script>
