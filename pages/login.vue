<template>
 <section class="container">
     <div>

      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                outlined
                v-model="name"
                label="Name"
                autocomplete="username"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
              outlined
                v-model="password"
                label="Password"
                type="password"
                autocomplete="current-password"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
             class="mt-3"
            >
            <v-btn
              class="mr-4"
              @click="login"
            >
              Login
            </v-btn>
            <strong class="red--text text--lighten-1">{{ error }}</strong>
          </v-col>

          </v-row>
        </v-container>
      </v-form>

     </div>
    </section>
</template>
<script>
import { mapState } from 'vuex'

export default {
 data() {
     return {
      valid: false,
      name:'',
      email: '',
      password:'',
      error: ''
     }
   },
  computed: {
    ...mapState('data', ['logged']),
  },

  async mounted() {
    let checkToken = await this.$store.dispatch('data/checkToken')
    if (checkToken)
      this.$router.push('/')
  },
  methods: {
    login: async function () {
      await this.$store.dispatch('data/login', {
        name: this.name,
        password: this.password
      })
      if (this.logged) {
        this.$router.push('/')
      } else {
        this.error = 'Bad login'
      }

    },
  }
}
</script>
<style>
.container {
   min-height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   text-align: center;
 }
</style>

