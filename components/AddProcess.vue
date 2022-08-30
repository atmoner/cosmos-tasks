<template>
<div>
    <v-dialog
      v-model="dialog"
      max-width="800px"
      max-height="800px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="ma-2"
          small
        >
        <v-icon dark>
          mdi-plus-circle-outline
        </v-icon>

          Add task
        </v-btn>
      </template>
      <v-card>

        <v-card-title>
          <span class="text-h5">Select new task</span>
        </v-card-title>
        <v-card-text>
        <v-item-group>

            <v-row>
              <v-col
                v-for="n in modulesConfig"
                :key="n.name"
                cols="12"
                md="6"
              >
                <v-item>
                  <v-card
                    height="120"
                  >
                  <v-card-title>
                    {{ n.name }}
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          color="grey"
                          v-bind="attrs"
                          v-on="on"
                          class="mb-4"
                          dense
                        >
                          mdi-information-outline
                        </v-icon>
                      </template>
                      <span v-html="n.desc + '<br /><h3>Script</h3>' + n.script"></span>
                    </v-tooltip>
                    <v-tooltip
                      top
                      v-if="n.auth"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          color="green"
                          v-bind="attrs"
                          v-on="on"
                          class="mb-4"
                          dense
                        >
                          mdi-wallet-outline
                        </v-icon>
                      </template>
                      <span v-html="">You need wallet to run this task</span>
                    </v-tooltip>
                    <v-tooltip
                      top
                      v-if="n.type === 'dev'"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          color="orange"
                          v-bind="attrs"
                          v-on="on"
                          class="mb-4"
                          dense
                        >
                          mdi-dev-to
                        </v-icon>
                      </template>
                      <span v-html="">Mod under development</span>
                    </v-tooltip>
                    <v-tooltip
                      top
                      v-if="n.type != 'dev'"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          color="green"
                          v-bind="attrs"
                          v-on="on"
                          class="mb-4"
                          dense
                        >
                          mdi-check-circle-outline
                        </v-icon>
                      </template>
                      <span v-html="">Ready to use</span>
                    </v-tooltip>
                  </v-card-title>

                  <v-card-actions>
                    <v-btn
                      color="blue darken-1"
                      small
                      block
                      text
                      @click="step2(n.name)"
                    >
                      Use it
                    </v-btn>
                  </v-card-actions>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>

        </v-item-group>
        </v-card-text>

      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogConfig"
      max-width="800px"
    >
      <v-card>
        <v-card-title class="text-h5">
          <img
            v-if="selectChain"
            width="24"
            height="24"
            :src="selectChain.img"
            alt=""
            class="ma-2"
          >
          Add task:  {{ selectModule }}
        </v-card-title>
        <v-card-subtitle>
          <p v-if="selectModuleDetail.notice !== ''" class="orange--text"><br />{{ selectModuleDetail.notice }}</p>
          <br /><p v-html='selectModuleDetail.desc' />
        </v-card-subtitle>

        <v-card-text>
          <v-form v-model="valid">
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  outlined
                  v-model="taskName"
                  :rules="[v => !!v || 'This field is required',]"
                  label="Task name"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-select
                  v-model="timerUi"
                  :rules="[v => !!v || 'This field is required',]"
                  outlined
                  :items="['Every 1s', 'Every 10s', 'Every minute', 'Every hour', 'Every day']"
                  label="Task timer"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-select
                  v-model="selectChain"
                  :rules="[v => !!v || 'This field is required',]"
                  :items="allAssets"
                  item-text="text"
                  label="Select Chain"
                  required
                  outlined
                  @input="setSelected(selectChain)"
                >
                  <template slot="item" slot-scope="data">
                    <img
                      width="24"
                      height="24"
                      :src="data.item.img"
                      alt=""
                      class="ma-2"
                    >
                    <span class="cb-item">{{data.item.text}}</span>
                  </template>
                </v-select>
              </v-col>
              <v-col
                v-if="selectModuleDetail.auth === true"
                cols="12"
                sm="6"
                md="6"
              >

                <v-select
                  v-model="finalWallet"
                  :rules="[v => !!v || 'This field is required',]"
                  outlined
                  :hint="viewAddrSelected"
                  :items="allWallet"
                  item-text="name"
                  label="Select wallet"
                  required
                  return-object
                  persistent-hint
                ></v-select>

              </v-col>
              <v-col
                v-if="selectModuleDetail.auth === true"
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  outlined
                  v-model="walletPassword"
                  :rules="[v => !!v || 'This field is required',]"
                  label="Password wallet"
                  type="password"
                  autoComplete="true"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                v-for="n in listVar"
                :key="n"
              >
                <v-text-field
                  v-model="allVariables[n]"
                  :rules="[v => !!v || 'This field is required',]"
                  outlined
                  :label="n"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="orange darken-1"
            @click="returnModal"
          >
            Return
          </v-btn>
          <v-btn
            color="green darken-1"
            :disabled="!valid"
            @click="addProcess"
          >
            Add task
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import cosmosConfig from '~/cosmos.config'
import modulesConfig from '~/scripts/config.modules'

export default {
  data: () => ({
    valid: false,
    dialog: false,
    dialogConfig: false,
    taskName: '',
    allAssets: [],
    selectChain: '',
    selectModule: '',
    selectModuleDetail: '',
    listVar: '',
    timerUi: '',
    modulesConfig: modulesConfig,
    walletPassword: '',
    allWallet: [],
    finalWallet: '',
    allVariables: [],
    viewAddrSelected: '',
  }),
  computed: {
    ...mapState('data', ['userToken']),
  },
  watch:{
    async 'finalWallet'(newVal){
      try {
        const foundChain = newVal.addr.find(element => element.viewDenom === this.selectChain.text)
        this.viewAddrSelected = foundChain.addr
      } catch (err) {
      }
    },
    async 'selectChain'(newVal){
      if (this.finalWallet !== '') {
        const foundChain = this.finalWallet.addr.find(element => element.viewDenom === newVal.text)
        this.viewAddrSelected = foundChain.addr
      }

    }
  },
  async mounted () {


    try {
      const response = await this.$axios.post( '/api/wallets/list', {
          token: this.userToken
        })
      var allWallet = this.allWallet
      response.data.forEach( function( item ) {
        allWallet.push( { name: item.name, addr: item.allAddress } )
      })
      this.allWallet = allWallet
    } catch (err) {
      console.log(err)
    }

  },
  methods: {
    async addProcess( name ) {
      const foundModule = modulesConfig.find(element => element.name === this.selectModule)
      var formatVariable = []

      for (const index in this.allVariables) {
        formatVariable.push({ key: index, value: this.allVariables[index] })
      }

      var authData = ''
      if (foundModule.auth === true) {
        let buff = new Buffer(this.walletPassword)
        let walletPassEncoded = buff.toString('base64')
        authData = { wallet: this.finalWallet.name, pass: walletPassEncoded }
      } else
        authData = false

      var timerValue = ''
      switch (this.timerUi) {
        case 'Every 1s':
          timerValue = 1000
          break;
        case 'Every 10s':
          timerValue = 10000
          break;
        case 'Every minute':
          timerValue = 60000
          break;
        case 'Every hour':
          timerValue = 3600000
          break;
        case 'Every day':
          timerValue = 86400000
          break;
        default:
          console.log(`Sorry, we are out of ${expr}.`);
      }

      const response = await this.$axios.post( '/api/process/add', {
        name: this.taskName,
        script: foundModule.script,
        timer: timerValue,
        timer_ui: this.timerUi,
        chain: this.selectChain.text,
        logo: this.selectChain.img,
        varPersonalised: formatVariable,
        authData: authData,
        token: this.userToken
      })
      this.$store.dispatch( 'data/getAllProcess' )
      this.allVariables = []
      this.dialogConfig = false
    },
    setSelected( value ) {
      const foundLogo = cosmosConfig.find( element => element.coinLookup.viewDenom === value )
      this.selectChain = { text: value, img: foundLogo.coinLookup.icon }
    },
    step2( module ) {
      this.dialog = false
      this.dialogConfig = true
      this.selectModule = module
      const foundModule = modulesConfig.find(element => element.name === this.selectModule)
      this.listVar = foundModule.variable
      this.selectModuleDetail = foundModule

      var allAssets = this.allAssets
      if (foundModule.useChain === 'all') {
        cosmosConfig.forEach( function( item ) {
          allAssets.push( { text: item.coinLookup.viewDenom, img: item.coinLookup.icon } )
        })
      } else {
        cosmosConfig.forEach( function( item ) {
          let found = foundModule.useChain.find(element => element === item.name)
          if(typeof found != "undefined")
            allAssets.push( { text: item.coinLookup.viewDenom, img: item.coinLookup.icon } )
        })
      }
      this.allAssets = allAssets
    },
    returnModal() {
      this.dialog = true
      this.dialogConfig = false
    }
  },
}
</script>
