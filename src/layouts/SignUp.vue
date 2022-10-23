<!-- Create registration layout -->
<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        v-model="name"
        label="Name"
        filled
        lazy-rules
        :rules="[ val => val.length > 5 || 'Name should be at least 6 characters' ]"
      />
      <q-input
        v-model="email"
        label="E-mail"
        filled
        lazy-rules
        :rules="['email' || 'Please type a valid e-mail']"
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

export default defineComponent({
  name: 'SignUp',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$router.push('/main')
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
