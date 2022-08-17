<template>
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
      <v-card>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="12"
              >
                <v-text-field
                  outlined
                  v-model="walletName"
                  :counter="10"
                  label="Wallet name"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="12"
              >
                <v-text-field
                  outlined
                  v-model="mnemonic"
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
                  label="Password"
                  type="password"
                  autoComplete="true"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer />
           <v-btn
            color="primary"
            nuxt
            @click="addWallet"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <v-card min-height="380px">
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
      </v-card>
    </v-col>
  </v-row>
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
    }),
    computed: {
      ...mapState('data', ['allProcess', 'allProcessLoaded', 'allWallets']),
    },
    async mounted () {
      await this.$store.dispatch('data/getAllWallets')
    },
    methods: {
      async addWallet() {
        try {
          const wallet = await DirectSecp256k1HdWallet.fromMnemonic( this.mnemonic )
          var finalWallet = await wallet.serialize( this.password )
          const response = await this.$axios.post('/api/wallets/add', {
            name: this.walletName,
            data: finalWallet
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
            name: walletName
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

