<template>
      <q-btn-toggle
        v-model="model"
        push
        flat
        toggle-color="primary"
        :options="[
          {label: 'Online', value: 'one', slot: 'one'},
          {label: 'DND', value: 'two', slot: 'two'},
          {label: 'Offline', value: 'three', slot: 'three'}
        ]"

>
        <template v-slot:one>
        </template>

        <template v-slot:two>
        </template>

        <template v-slot:three>
        </template>
      </q-btn-toggle>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'OnlineStatus',
  setup () {
    const model = ref('one')

    return {
      model
    }
  }
}
</script>
