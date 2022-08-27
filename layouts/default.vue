<template>
  <v-app id="inspire">


    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        >
          <img
            width="32"
            height="32"
            src="https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/atom.svg"
            alt=""
            class="ma-2"
        >

        </v-avatar>
        <div v-if="logged">
          <v-btn
            @click="logout"
          >
            Logout
          </v-btn>
        </div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, link] in links"
          :key="link"
          :to="link"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    drawer: null,
    links: [
    ],
  }),
  computed: {
    ...mapState('data', ['logged']),
  },
  watch: {
    logged(val, oldVal) {
      this.links = []
      this.links.push(
        ['mdi-inbox-arrow-down', 'Tasks', '/'],
        ['mdi-wallet-plus-outline', 'Wallets', '/add-wallet'],
        ['mdi-lifebuoy', 'Help', '/help'],
      )
    }
  },
  created() {

    if (!this.logged) {
      this.links.push(
        ['mdi-login', 'Login', '/login'],
        ['mdi-lifebuoy', 'Help', '/help']
      )
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('data/logout')
      this.links = []
      this.links.push(
        ['mdi-login', 'Login', '/login'],
        ['mdi-lifebuoy', 'Help', '/help']
      )
      this.$router.push('/login')
    },
  },
}
</script>
