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
                      Address: <b>{{ addressWallet }}</b>
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
          <br />
          <v-card min-height="460px">
            <v-card-title>
              Your wallets
            </v-card-title>
            <v-card-text>

              <v-expansion-panels>
                <v-expansion-panel
                  v-for="item in allWallets"
                  :key="item.name"
                >
                  <v-expansion-panel-header>
                    {{ item.name }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                              Chain
                            </th>
                            <th class="text-left">
                              Address
                            </th>
                          </tr>
                        </thead>
      <!--                  <tbody>
                          <tr>
                            <td>{{ item.name }} </td>
                            <td>directsecp256k1hdwallet-v1</td>

                            <td>
                              <v-btn
                                color="error"
                                @click="deleteWallet(item.name)"
                              >
                                Delete
                              </v-btn>
                            </td>
                          </tr>
                        </tbody>-->

                        <tbody>
                          <tr
                            v-for="conf in item.allAddress"
                            :key="conf.chain"

                          >
                            <td>
                              <v-avatar size="36">
                                <img
                                  :src="conf.img"
                                  :alt="conf.img"
                                >
                              </v-avatar>
                            <b>{{ conf.chain }}</b> </td>
                            <td><a :href="conf.mintscanId" target="_blank"> {{ conf.addr }}</a> </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn
                        color="error"
                        @click="deleteWallet(item.name)"
                      >
                      Delete
                      </v-btn>
                    </v-card-actions>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
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
import cosmosConfig from '~/cosmos.config'

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
      addressWallet: '',
      addressWalletError: false,
      cosmosConfig: cosmosConfig,
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
    watch:{
      async 'mnemonic'(newVal){
        try {
          const wallet = await DirectSecp256k1HdWallet.fromMnemonic(newVal, {
            prefix: 'cosmos'
          });
          const [firstAccount] = await wallet.getAccounts()
          console.log(firstAccount)
          this.addressWallet = firstAccount.address
        } catch (error) {
          console.log(error)
          this.addressWallet = error
        }
      }
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
        try {
          const wallet = await DirectSecp256k1HdWallet.fromMnemonic( this.mnemonic )
          var finalWallet = await wallet.serialize( this.password )
          const response = await this.$axios.post('/api/wallets/add', {
            name: this.walletName,
            data: finalWallet,
            token: this.userToken,
            address: this.addressWallet
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

