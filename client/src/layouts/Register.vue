<!-- Create registration layout -->
<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md register">
      <q-input
        v-model="name"
        label="Name"
        filled
        lazy-rules
        :rules="[ val => val.length > 5 || 'Name should be at least 6 characters' ]"
      />
      <q-input
        v-model="surname"
        label="Surname"
        filled
        lazy-rules
        :rules="[ val => val.length > 5 || 'Name should be at least 6 characters' ]"
      />
      <q-input
        v-model="email"
        label="E-mail"
        filled
        lazy-rules
        :rules="['email']"
        error-message="Please type a valid e-mail"
      />
      <q-input
        v-model="password"
        label="Password"
        filled
        lazy-rules
        :rules="[ val => val.length > 5 || 'Password should be at least 6 characters' ]"
        type="password"
      />
      <q-input
        v-model="passwordConfirm"
        label="Confirm password"
        filled
        lazy-rules
        :rules="[ val => val.length > 5 || 'Password should be at least 6 characters' ]"
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
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()
console.log('ASAAAAAAAAAAAAAAAA', $q)
export default defineComponent({
  name: 'RegisterPage',
  data () {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()
      await api.post('/register', {
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password
      })
        .then(response => {
          $q.notify({
            message: `Success: ${response}`,
            color: 'positive',
            position: 'top',
            icon: 'check_circle',
            timeout: 80000
          })
        })
        .catch(_error => {
          $q.notify({
            message: `Error: ${_error}`,
            color: 'negative',
            position: 'top',
            timeout: 2000
          })
        }
        )
      // this.$router.push('/main')
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
