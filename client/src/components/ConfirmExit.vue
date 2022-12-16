<template>
  <q-btn
    round
    icon-right
    dense
    color="green-1"
    icon="cancel"
    label=""
    @click="confirm = true"
  />
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="logout" color="primary" text-color="white" />
        <span class="q-ml-sm"
          >Do you really want to leave?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Yes" color="primary" v-close-popup />
        <q-btn flat label="No" color="secondary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),

      address: ref('')
    }
  }
}
</script>
