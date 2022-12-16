<template>
  <q-scroll-area >
  <q-list bordered>
    <q-item clickable v-ripple v-for="user in users" :key="user.id">
      <q-item-section avatar>
        <q-icon color="primary" name="bluetooth" />
      </q-item-section>
      <q-item-section>Icon as avatar</q-item-section>
    </q-item>
  </q-list>
  </q-scroll-area>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UsersList',
  setup () {
    return {
    }
  }
})
</script>
