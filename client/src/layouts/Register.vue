<!-- Create registration layout -->
<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md register">
      <q-input
        v-model="name"
        label="Name"
        filled
        lazy-rules
        :rules="[ val => val.length > 4 || 'Name should be at least 5 characters' ]"
      />
      <q-input
        v-model="surname"
        label="Surname"
        filled
        lazy-rules
        :rules="[ val => val.length > 4 || 'Name should be at least 5 characters' ]"
      />
      <q-input
        v-model="login"
        label="Login"
        filled
        lazy-rules
        :rules="[val => val.length > 4 || 'Name should be at least 5 characters']"
        error-message="Please type a valid login"
      />
      <q-input
        v-model="password"
        label="Password"
        filled
        lazy-rules
        :rules="[ val => val.length > 4 || 'Password should be at least 5 characters' ]"
        type="password"
      />
      <q-input
        v-model="passwordConfirm"
        label="Confirm password"
        filled
        lazy-rules
        :rules="[ val => val.length > 4 || 'Password should be at least 5 characters' ]"
        type="password"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import chatsStore from '../stores/chats'
import { api } from 'boot/axios'

const chats = chatsStore()
export default defineComponent({
  name: 'RegisterPage',
  data () {
    return {
      name: '',
      surname: '',
      login: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()
      api.post('auth/register', {
        login: this.login,
        name: this.name,
        surname: this.surname,
        password: this.password
      })
        .then(response => {
          // Add chats to store
          chats.setChats(response.data.chats)
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
    onReset () {
      this.name = ''
      this.email = ''
      this.password = ''
      this.passwordConfirm = ''
    }
  }
})
</script>

<style scoped>
.register{
  width: 70%;
  margin: auto;
  margin-top: 10%;
}
</style>
