<template>
  <v-row justify="center" align="center" class="pa-md-8 mx-lg-auto">



    <v-col cols="12" sm="8" md="12">

      <div>
        <p v-if="$fetchState.pending"></p>
        <p v-else-if="$fetchState.error">An error occurred</p>
        <div v-else>

          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-item>
                <v-card
                  class="mx-auto"
                  height="70"
                >
                  <v-card-title>
                    Tasks
                    <v-spacer></v-spacer>
                    <v-chip
                      :color="allProcess.length < 1 ? 'orange' : 'green'"
                      text-color="white"
                    >
                      {{ allProcess.length }}
                    </v-chip>
                  </v-card-title>
                </v-card>
              </v-item>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-item>
                <v-card
                  class="mx-auto"
                  height="70"
                >
                  <v-card-title>
                    Wallets
                    <v-spacer></v-spacer>
                    <v-chip
                      :color="allWallets.length < 1 ? 'orange' : 'green'"
                      text-color="white"
                    >
                      {{ allWallets.length }}
                    </v-chip>

                  </v-card-title>
                </v-card>
              </v-item>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-item>
                <v-card
                  class="mx-auto"
                  height="70"
                >
                  <v-card-title>
                    Errors
                    <v-spacer></v-spacer>
                    <v-chip
                      color="green"
                      text-color="white"
                    >
                      0
                    </v-chip>
                  </v-card-title>
                </v-card>
              </v-item>
            </v-col>
          </v-row>

          <v-card class="mt-12 mx-auto">
            <v-card-title class="headline">
              Tasks management <AddProcess />
              <v-spacer />
              <v-btn
                elevation="2"
                small
                @click="refresh"
              >
              <v-icon dark>
                mdi-refresh
              </v-icon>
                REFRESH
              </v-btn>
            </v-card-title>

            <v-card-text>
              <v-simple-table
                v-if="allProcess.length > 0"
              >
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
                      <td>{{ p.item.COSMOS_WALLET }}</td>
                      <td>
                      <v-progress-circular :value="20"></v-progress-circular>
                      {{ p.item.COSMOS_TIMER_UI }} ({{ p.item.COSMOS_LAST_UPDATE }})</td>
                      <td>
                        <img
                          width="32"
                          height="32"
                          :src="p.item.COSMOS_LOGO"
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
                          :disabled="p.item.status !== 'stopped'"
                        >
                          <v-icon dark>
                            mdi-arrow-right-drop-circle-outline
                          </v-icon>
                          Start
                        </v-btn>
                        <v-btn
                          elevation="2"
                          color="blue"
                          small
                          @click="start(p.item.name)"
                          :disabled="p.item.status === 'stopped'"
                        >
                          <v-icon dark>
                            mdi-arrow-right-drop-circle-outline
                          </v-icon>
                          Restart
                        </v-btn>
                        <v-btn
                          elevation="2"
                          color="warning"
                          small
                          @click="stop(p.item.pm_id)"
                          :disabled="p.item.status == 'stopped'"
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
                          :disabled="p.item.status !== 'stopped'"
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
                          @click="selectTask(p.item.name)"
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
            </v-card-text>
          </v-card>
        </div>
      </div>

          <v-row v-if="logName">
            <v-col
              cols="12"
              md="6"
            >
              <v-card class="mt-12 mx-auto">
                <v-card-title class="headline">
                  Main logs
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
                      @click="emptyLog(logName)"
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

            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-card class="mt-12 mx-auto">
                <v-card-title class="headline">
                  Errors logs
                    <v-spacer></v-spacer>
                    <v-btn
                      elevation="2"
                      small
                      @click="readErrorLog(logName)"
                    >
                      <v-icon dark>
                        mdi-refresh
                      </v-icon>
                      Refresh
                    </v-btn>

                    <v-btn
                      elevation="2"
                      small
                      @click="emptyErrorLog(logName)"
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
                      :value="errorLog"
                    ></v-textarea>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>






    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import { notifWaiting, notifError, notifSuccess } from '~/libs/notifications'

export default {
  name: 'IndexPage',
  data () {
    return {
      structDatas: [],
      log: '',
      logName: '',
      errorLog: '',
    }
  },
  computed: {
    ...mapState('data', ['allProcess', 'allProcessLoaded', 'allWallets', 'logged', 'userToken']),
  },
  async mounted () {
    let checkToken = await this.$store.dispatch('data/checkToken')
    if (checkToken) {
      this.initProcess()
      let today = dayjs(new Date()).endOf('month');
      console.log(today)
    }
  },
  async fetch() {
    let checkToken = await this.$store.dispatch('data/checkToken')
    if (!checkToken) {
      this.$router.push('/login')
    }
  },
  methods: {
    async refresh() {
      await this.$store.dispatch('data/getAllProcess')
      await this.$store.dispatch('data/getAllWallets')
      notifSuccess(this.$toast, 'Refresh!!')
    },
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
      notifSuccess(this.$toast, name + ' module started')
    },
    async stop(id) {
      const response = await this.$axios.post('/api/process/stop', {
        id: id,
        token: this.userToken
      })
      this.$store.dispatch('data/getAllProcess')
      notifSuccess(this.$toast, 'Module stoped')
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
      // notifSuccess(this.$toast, 'Log refreshed')
    },
    async emptyLog(name) {
      const response = await this.$axios.post('/api/process/log/empty', {
        name: name,
        token: this.userToken
      })
      this.log = response.data
      notifSuccess(this.$toast, 'Log deleted')
    },
    async readErrorLog(name) {
      const response = await this.$axios.post('/api/process/error-log', {
        name: name,
        token: this.userToken
      })
      this.errorLog = response.data
      this.logName = name
    },
    // TODO deleteErrorLog /process/error-log/empty
    async emptyErrorLog(name) {
      const response = await this.$axios.post('/api/process/error-log/empty', {
        name: name,
        token: this.userToken
      })
      this.errorLog = response.data
      notifSuccess(this.$toast, 'error-log deleted')
    },
    async selectTask(name) {
      this.readLog(name)
      this.readErrorLog(name)
    },

  },
}
</script>
