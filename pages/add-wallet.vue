<template>
  <div>
    <p v-if="$fetchState.pending"></p>
    <p v-else-if="$fetchState.error">An error occurred</p>
    <div v-else>
      <v-row justify="center" align="center" class="pa-md-8 mx-lg-auto">
      <v-col cols="12" sm="8" md="6">
        <v-alert
          v-if="viewError"
          border="right"
          colored-border
          type="error"
          elevation="2"
        >
          {{ viewErrorMsg }}
        </v-alert>
          <v-card min-height="380px">
            <v-card-title>
              Add wallet
            </v-card-title>
            <v-card-text>
              <v-form v-model="valid">

                  <v-row>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <v-text-field
                        outlined
                        v-model="walletName"
                        :rules="nameRules"
                        :counter="20"
                        label="Wallet name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <v-text-field
                        outlined
                        v-model="mnemonic"
                        :rules="mnemonicRules"
                        label="Your mnemonic"
                        type="password"
                        autoComplete="true"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <v-text-field
                        outlined
                        v-model="password"
                        :rules="passRules"
                        label="Password"
                        type="password"
                        autoComplete="true"
                      ></v-text-field>
                    </v-col>
                  </v-row>

              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                :disabled="!valid"
                nuxt
                @click="addWallet"
              >
                Add wallet
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8" md="6">
          <v-card min-height="440px">
            <v-card-title>
              Your wallets
            </v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Name
                      </th>
                      <th class="text-left">
                        Method
                      </th>
                      <!--<th class="text-left">
                        Path
                      </th>-->
                      <th class="text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr
                      v-for="item in allWallets"
                      :key="item.name"
                    >
                      <td>{{ item.name }}</td>
                      <td>directsecp256k1hdwallet-v1</td>
                      <!--<td>{{ item.path }}</td>-->
                      <td>
                        <v-btn
                          color="error"
                          @click="deleteWallet(item.name)"
                        >
                          Delete
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </div>
  </div>


</template>

<script>
import { mapState } from 'vuex'
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"

  export default {
    data: () => ({
      valid: false,
      walletName: '',
      mnemonic: '',
      password: '',
      viewError: false,
      viewErrorMsg: '',
      listWallets: '',
      dialogDetail: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'Name must be less than 20 characters',
      ],
      mnemonicRules: [
        v => !!v || 'Mnemonic is required',
      ],
      passRules: [
        v => !!v || 'Password is required'
      ],
    }),
    computed: {
      ...mapState('data', ['allProcess', 'allProcessLoaded', 'allWallets', 'logged', 'userToken']),
    },
    async fetch() {
      let checkToken = await this.$store.dispatch('data/checkToken')
      if (!checkToken) {
        this.$router.push('/login')
      }
    },
    async mounted () {
      let checkToken = await this.$store.dispatch('data/checkToken')
      if (checkToken) {
        await this.$store.dispatch('data/getAllWallets')
      }
    },
    methods: {
      async addWallet() {
        console.log(this.$refs.form.validate())
        try {
          const wallet = await DirectSecp256k1HdWallet.fromMnemonic( this.mnemonic )
          var finalWallet = await wallet.serialize( this.password )
          const response = await this.$axios.post('/api/wallets/add', {
            name: this.walletName,
            data: finalWallet,
            token: this.userToken
          })
          await this.$store.dispatch('data/getAllWallets')
        } catch (error) {
          this.viewError = true
          this.viewErrorMsg = error
        }
      },
      async deleteWallet(walletName) {
        try {
          const response = await this.$axios.post('/api/wallets/delete', {
            name: walletName,
            token: this.userToken
          })
          await this.$store.dispatch('data/getAllWallets')
        } catch (error) {
          this.viewError = true
          this.viewErrorMsg = error
        }
      },
    },
  }
</script>

