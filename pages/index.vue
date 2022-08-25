<template>
  <v-row justify="center" align="center" class="pa-md-8 mx-lg-auto">
    <v-col cols="12" sm="8" md="12">
      <div>
        <p v-if="$fetchState.pending"></p>
        <p v-else-if="$fetchState.error">An error occurred</p>
        <div v-else>
          <v-card>
            <v-card-title class="headline">
              Tasks management <AddProcess />
              <v-spacer />
              <v-btn
                elevation="2"
                small
                @click="initProcess"
              >
              <v-icon dark>
                mdi-refresh
              </v-icon>
                REFRESH
              </v-btn>
            </v-card-title>

            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Id
                      </th>
                      <th class="text-left">
                        Name
                      </th>
                      <th class="text-left">
                        From
                      </th>
                      <th class="text-left">
                        Timer / Last update
                      </th>
                      <th class="text-left">
                        Chain
                      </th>
                      <th class="text-left">
                        Cpu
                      </th>
                      <th class="text-left">
                        Memory
                      </th>
                      <th class="text-left">
                        Actions
                      </th>
                      <th class="text-left">
                        Logs
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-if="allProcess.length > 0"
                      v-for="p in allProcess"
                      :key="p.item.name"
                    >
                      <td>{{ p.item.pm_id }}</td>
                      <td>{{ p.item.name }}</td>
                      <td>{{ p.item.pm2_env.COSMOS_WALLET }}</td>
                      <td>{{ p.item.pm2_env.COSMOS_TIMER_UI }} ({{ p.item.pm2_env.COSMOS_LAST_UPDATE }})</td>
                      <td>
                        <img
                          width="32"
                          height="32"
                          :src="p.item.pm2_env.COSMOS_LOGO"
                          alt=""
                          class="ma-2"
                        >
                      </td>
                      <td>{{ p.item.monit.cpu }}%</td>
                      <td>{{ (p.item.monit.memory / 1000000).toFixed(2) }}mb</td>
                      <td>
                        <v-btn
                          elevation="2"
                          color="green"
                          small
                          @click="start(p.item.name)"
                          :disabled="p.item.pm2_env.status !== 'stopped'"
                        >
                          <v-icon dark>
                            mdi-arrow-right-drop-circle-outline
                          </v-icon>
                          Start
                        </v-btn>
                        <v-btn
                          elevation="2"
                          color="warning"
                          small
                          @click="stop(p.item.pm_id)"
                          :disabled="p.item.pm2_env.status == 'stopped'"
                        >
                          <v-icon dark>
                            mdi-pause-octagon-outline
                          </v-icon>
                          Stop
                        </v-btn>
                        <v-btn
                          elevation="2"
                          color="error"
                          small
                          @click="deleteProcess(p.item.pm_id, p.item.name)"
                          :disabled="p.item.pm2_env.status !== 'stopped'"
                        >
                          <v-icon dark>
                            mdi-delete-forever-outline
                          </v-icon>
                          Delete
                        </v-btn>
                      </td>
                      <td>
                        <v-btn
                          elevation="2"
                          small
                          @click.stop="dialog = true && readLog(p.item.name)"
                        >
                          <v-icon dark>
                            mdi-post-outline
                          </v-icon>
                          Log
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-dialog
                v-model="dialog"
                max-width="800"
              >
                <v-card>
                  <v-card-title class="text-h5">
                    {{ logName }} Logs
                    <v-spacer></v-spacer>
                    <v-btn
                      elevation="2"
                      small
                      @click="readLog(logName)"
                    >
                      <v-icon dark>
                        mdi-refresh
                      </v-icon>
                      Refresh
                    </v-btn>
                    <v-btn
                      elevation="2"
                      small
                      @click.stop="dialog = true && emptyLog(logName)"
                    >
                      <v-icon dark>
                        mdi-broom
                      </v-icon>
                      Empty log
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <v-textarea
                      solo
                      name="input-7-4"
                      label="Task log"
                      :value="log"
                    ></v-textarea>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card-text>
          </v-card>
        </div>
      </div>


    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  data () {
    return {
      structDatas: [],
      dialog: false,
      log: '',
      logName: '',
    }
  },
  computed: {
    ...mapState('data', ['allProcess', 'allProcessLoaded', 'allWallets', 'logged', 'userToken']),
  },
  async mounted () {
    let checkToken = await this.$store.dispatch('data/checkToken')
    if (checkToken) {
      this.initProcess()
    }
  },
  async fetch() {
    let checkToken = await this.$store.dispatch('data/checkToken')
    if (!checkToken) {
      this.$router.push('/login')
    }
  },
  methods: {
    async initProcess(name) {
      await this.$store.dispatch('data/getAllProcess')
      await this.$store.dispatch('data/getAllWallets')
    },
    async start(name) {
      const response = await this.$axios.post('/api/process/start', {
        name: name,
        token: this.userToken
      })
      this.$store.dispatch('data/getAllProcess')
    },
    async stop(id) {
      const response = await this.$axios.post('/api/process/stop', {
        id: id,
        token: this.userToken
      })
      this.$store.dispatch('data/getAllProcess')
    },
    async deleteProcess(id, name) {
      const response = await this.$axios.post('/api/process/delete', {
        id: id,
        name: name,
        token: this.userToken
      })
      this.$store.dispatch('data/getAllProcess')
    },
    async readLog(name) {
      const response = await this.$axios.post('/api/process/log', {
        name: name,
        token: this.userToken
      })
      this.log = response.data
      this.logName = name
    },
    async emptyLog(name) {
      const response = await this.$axios.post('/api/process/log/empty', {
        name: name,
        token: this.userToken
      })
      this.log = response.data
    },

  },
}
</script>
