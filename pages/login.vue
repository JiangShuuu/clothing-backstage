<template>
  <main class="main">
    <div class="picturebox">
      <img src="~/static/images/logo.png" class="picture" alt="">
    </div>
    <h1>後台系統登入{{$auth.user}}</h1>
    <v-form ref="form" v-model="valid" lazy-validation class="form">

      <v-text-field v-model="email" :rules="emailRules" label="信箱" required></v-text-field>
      <v-text-field v-model="password" type="password" :rules="passwordRules" label="密碼" required></v-text-field>

      <v-checkbox
        v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="不是機器人?"
        required>
      </v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        登入
      </v-btn>
    </v-form>
  </main>
</template>

<script>
  // import { validationMixin } from 'vuelidate'

  export default {
    name: 'LoginPage',
    layout: 'forLogin',
    auth: 'guest',
    data: () => ({
      email: 'root@example.com',
      password: '12345678',
      checkbox: false,
      valid: true,
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }),

    methods: {
      async validate() {
        if (this.$refs.form.validate()) {
          const response = await this.$auth.loginWith('local', { data: {
            email: this.email,
            password: this.password
          }})
          this.$auth.strategy.token.set(response.data.data.token)
          console.log(response.data.data.user)
          this.$auth.setUser(response.data.data.user)
          this.$router.push('/')
        }
      },
    }
  }
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.form {
  margin-top: 50px;
  width: 50%;
}

.picturebox {
  width: 13rem;
}

.picture {
  width: 100%
}
</style>
