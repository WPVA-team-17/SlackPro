<template>
      <q-form @submit="onLogin" class="q-gutter-md login">
        <q-input
        v-model="login"
        label="Login"
        filled
        lazy-rules
        :rules="[val => (val && val.length > 4) || 'Password should be at least 5 characters']"
        error-message="Please type a valid e-mail"
        />
        <q-input
        v-model="password"
        label="Password"
        filled
        lazy-rules
        :rules="[val => (val && val.length > 4) || 'Password should be at least 5 characters']"
        type="password"
        />
        <q-btn type="submit" color="primary" label="Login"    @click="onLogin" style="float: right"/>
        <q-btn type="submit" color="primary" label="Register" @click="register" />
      </q-form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import chatsStore from '../stores/chats'

const chats = chatsStore()

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const $q = useQuasar()
    return {
      login: ref(''),
      password: ref('')
    }
  },
  methods: {
    onLogin (evt) {
      evt.preventDefault()
      if (!this.login || !this.password) {
        this.$q.notify({
          message: 'Please fill all fields',
          color: 'negative',
          position: 'top',
          timeout: 80000
        })
        return
      }

      api.post('auth/login', {
        login: this.login,
        password: this.password
      })
        .then(response => {
          chats.setChats(response.data.chats)
          console.log(response.data.token)
          localStorage.setItem('token', response.data.token)
          api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`
          this.$router.push('/main')
        })
        .catch(error => {
          this.$q.notify({
            message: `${error.response.data.message}`,
            color: 'negative',
            position: 'top',
            timeout: 5000
          })
        })
    },
    register (evt) {
      evt.preventDefault()
      this.$router.push('/register')
    }
  }
})
</script>

<style scoped>
.login{
  height: 50%;
  width: 70%;
  margin: auto;
  margin-top: 25%;
}
</style>
