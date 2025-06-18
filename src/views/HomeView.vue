<script>
import AppNavigation from '@/components/layouts/AppNavigation.vue'
import { defineComponent } from 'vue'
import BoardDetail from '@/components/BoardDetail.vue'

export default defineComponent({
  components: { BoardDetail, AppNavigation },
})
</script>
<template>
  <AppNavigation>
    <div class="">
<!--      <BoardList></BoardList>-->
      <BoardDetail></BoardDetail>
    </div>
  </AppNavigation>
</template>

<style></style>
