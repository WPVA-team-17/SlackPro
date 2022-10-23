<template>
      <q-form @submit="signIn" class="q-gutter-md signIn">
        <q-input
        v-model="nickname"
        label="nickname"
        filled
        lazy-rules
        :rules="[val => (val && val.length > 5) || 'Nickname should be at least 6 characters']"
        />
        <q-input
        v-model="password"
        label="Password"
        filled
        lazy-rules
        :rules="[val => (val && val.length > 5) || 'Password should be at least 6 characters']"
        type="password"
        />
        <q-btn type="submit" color="primary" label="Sign In" style="float: right"/>
        <q-btn type="submit" color="primary" label="Sign Up" @click="signUp" />
      </q-form>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const username = ref('')
    const password = ref('')
    return {
      nickname: username,
      password
    }
  },
  methods: {
    signIn (evt) {
      evt.preventDefault()
      this.$router.push('/main')
    },
    signUp (evt) {
      evt.preventDefault()
      this.$router.push('/signup')
    }
  }
})
</script>

<style>
.signIn {
  height: 50%;
  width: 70%;
  margin: auto;
  margin-top: 25%;
}
</style>
