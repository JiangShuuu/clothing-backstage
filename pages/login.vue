<template>
  <main class="main">
    <div class="picturebox">
      <img src="~/static/images/logo.png" class="picture" alt="">
    </div>
    <h1>後台系統登入</h1>
    <form class="container">
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="信箱"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        :error-messages="passwordErrors"
        label="密碼"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="不是機器人?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>
      <v-btn
        class="mr-4"
        @click="submit"
      >
        登入
      </v-btn>
    </form>
  </main>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    name: 'LoginPage',
    mixins: [validationMixin],
    layout: 'forLogin',
    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      password: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      password: '',
      email: '',
      checkbox: false,
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
      }
    },
  }
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.container {
  width: 50%;
}

.picturebox {
  width: 13rem;
}

.picture {
  width: 100%
}
</style>
