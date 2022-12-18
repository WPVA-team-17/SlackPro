<template>
  <q-scroll-area style="height: 100%; width: auto" class="bg-green-4">
    <q-layout view="lhr lpR lfr">

      <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
        <!-- drawer content -->
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
      <q-item clickable>
        <q-item-section>New group</q-item-section>
      </q-item>

    </q-layout>
  </q-scroll-area>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'typing-message',
  setup () {
    const rightDrawerOpen = ref(false)

    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>

<style>
.onlineStatus {
  height: 5%;
  width: 100%;
}
</style>
