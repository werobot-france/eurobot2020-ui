<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="10" lg="8" xl="6">
        <v-stepper v-model="step">
          <v-stepper-items>
            <v-stepper-content
              style="padding-top: 0"
              step="1"
            >
              <v-radio-group v-model="$store.state.buosDisposition">
                <v-row class="ma-0 pa-0 mb-n1" v-for="i in 3" :key="i" style="cursor: pointer;">
                  <v-col cols="2 d-flex justify-center align-center">
                    <v-radio
                      large
                      :value="i"
                    ></v-radio>
                  </v-col>
                  <v-col cols="9  d-flex justify-center align-center">
                    <v-img
                      @click="$store.state.buosDisposition = i"
                      :src="'gobelets' + i + '.png'"
                      class="w-100"
                      contain
                    ></v-img>
                  </v-col>
                </v-row>
              </v-radio-group>

              <v-layout class="mt-1">
                <v-spacer />
                <v-btn @click="step = 2" color="primary">
                  Next
                </v-btn>
              </v-layout>
            </v-stepper-content>
            <v-stepper-content
              style="padding-top: 0"
              step="2"
            >
              <div class="team-mosaic">
                <div
                  v-for="team in [['blue', 'blue', 'Blue'], ['yellow', 'amber', 'Yellow']]"
                  :key="team[0]"
                  class="team elevation-2"
                  :class="($store.state.team !== team[0] ? 'hidden' : '') + ' ' + team[1]"
                  @click="$store.state.team = team[0]">
                  {{ team[2] }}
                </div>
              </div>

              <v-layout class="mt-1">
                <v-btn @click="step = 1" text>
                  Previous
                </v-btn>
                <v-spacer />
                <v-btn @click="arm()" color="primary">
                  Start Game
                </v-btn>
              </v-layout>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <!-- <v-layout class="mt-1">
          <v-spacer />
          <v-btn @click="startGame()" color="primary">
            Start Game
          </v-btn>
        </v-layout> -->
      </v-col>
    </v-row>
    <v-dialog
      v-model="inGameModal"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      class="play-dialog m-auto">
      <div class="play-dialog-content">
        <transition>
          <v-card
            v-if="$store.state.gameState == 'armed'"
            tile
            :class="awaitingColor"
            class="play-card armed">
            <v-btn
              class="abort-btn" icon dark outlined
              @click="abort()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="text-center white--text" style="max-width: 500px;">
              <div class="text-h3">
                Armed, awaiting game start!
              </div>
              <div class="text-h6 mt-4">
                Be confident that it will not be a total disaster. I'm trusting my self!
              </div>
            </div>
          </v-card>
        </transition>
        <transition name="fade">
          <v-card
            v-if="$store.state.gameState == 'playing'"
            class="play-card"
            tile>
            <v-toolbar flat class="pa-2 mb-2">
              <div class=" playing-header">
                <div class="playing-header-title text-h5">
                  <img src="/logo.png" class="playing-logo" />
                  We Robot
                </div>
                <div class="playing-header-meta text-h5">
                  <div class="score">
                    <span class="grey--text">Score:</span> {{ score }}
                  </div>
                  <div class="countdown ml-4">
                    <span><span class="grey--text">T: - </span>{{ gameCountdownFormatted[0] }}<span class="grey-text">:</span>{{ gameCountdownFormatted[1] }}</span>
                  </div>
                </div>
              </div>
            </v-toolbar>
            <v-row class="justify-center" no-gutters>
              <v-col cols="12" sm="8">
                <v-list>
                  <div
                    v-for="(schedule, index) in schedules"
                    :key="index">
                    <v-divider />
                    <v-list-item>
                      <v-list-item-action>
                        <v-btn v-if="schedule.state === 'pending'" color="warning" icon small><v-icon>more_horiz</v-icon></v-btn>
                        <v-btn v-if="schedule.state === 'loading'" color="primary" icon small loading />
                        <v-btn v-if="schedule.state === 'done'" color="success" icon small><v-icon>done</v-icon></v-btn>
                        <v-btn v-if="schedule.state === 'canceled'" color="errored" icon small><v-icon>close</v-icon></v-btn>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title v-text="schedule.title" />
                      </v-list-item-content>
                      <v-list-item-action class="grey--text">
                        <span>{{ schedule.duration }}</span>
                      </v-list-item-action>
                    </v-list-item>
                  </div>
                  <v-divider />
                </v-list>
              </v-col>
            </v-row>
          </v-card>
        </transition>
        <transition name="fade">
          <v-card
            v-if="$store.state.gameState == 'ended'"
            class="play-card game-over green"
            tile>
            <v-btn
              class="abort-btn" dark icon outlined
              :color="closeConfirmation ? 'red' : ''"
              @click="close()">
              <v-icon v-if="closeConfirmation">done</v-icon>
              <v-icon v-else>close</v-icon>
            </v-btn>
            <div class="game-over">
              <div class="text-h3 green--text text--lighten-5 mb-2">🎉 Game over! 🎉</div>
              <div class="text-h6 green--text text--lighten-4">For the score, the question is really quicky answered:</div>
              <div class="text-h1 mt-5 white--text score">{{ score }}</div>
            </div>
          </v-card>
        </transition>
      </div>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    inGameModal: false,
    awaitingColor: 'red',
    awaitingColors: [
      'red', 'pink', 'purple', 'deep-purple', 'indigo',
      'blue', 'cyan', 'teal', 'green', 'light-green', 'orange'
    ],
    awaitingInterval: null,
    countdownInterval: null,
    gameCountdown: 0,
    gameCountdownFormatted: ['00','00'],
    score: 15,
    closeConfirmation: false,
    schedules: [
      {
        duration: '00:08',
        state: 'done',
        title: 'Go to the dispenser'
      },
      {
        duration: '00:15',
        state: 'loading',
        title: 'Taking buos'
      },
      {
        duration: '',
        state: 'pending',
        title: 'Go to port'
      },
      {
        duration: '',
        state: 'pending',
        title: 'Drop the mic'
      },
      {
        duration: '',
        state: 'pending',
        title: 'Go to another dispenser'
      }
    ]
  }),
  mounted() {
    // this.inGameModal = true
    // this.$store.commit('SET_GAME_STATE', 'playing')
    // this.score = 42
    // this.gameCountdownFormatted = ['01', '17']
  },
  methods: {
    arm () {
      console.log('> Play: arming the robot')
      this.inGameModal = true
      this.gameCountdownFormatted = ['00', '00']
      this.$store.commit('SET_GAME_STATE', 'armed')
      
      this.$store.state.ws.send('arm', {
        team: this.$store.state.team,
        buosDisposition: this.$store.state.buosDisposition
      })
      this.awaitingColorIndex = 0
      this.awaitingInterval = setInterval(this.awaiting, 1000)

      this.$store.state.ws.on('gameStart', 'p1', this.gameStart)
      this.$store.state.ws.on('gameEnd', 'p2', this.gameEnd)
    },
    awaiting () {
      this.awaitingColor = this.awaitingColors[this.awaitingColorIndex]
      this.awaitingColorIndex++
      if (this.awaitingColorIndex >= this.awaitingColors.length) {
        this.awaitingColorIndex = 0
      }
    },
    countdown () {
      //console.log('countdown', this.gameCountdown)
      if (this.gameCountdown > 0) {
        this.gameCountdown--
      }
      // render the formatted countdown
      let minutes = Math.floor(this.gameCountdown / 60).toString()
      let seconds = (this.gameCountdown - minutes * 60).toString()
      if (seconds.length === 1) {
        seconds = '0' + seconds
      }
      minutes = '0' + minutes
      this.gameCountdownFormatted = [minutes, seconds]
    },
    gameStart () {
      console.log('> Play: Game started', 'd')
      this.$store.commit('SET_GAME_STATE', 'playing')
      this.gameCountdown = 10
      this.countdown()
      if (this.countdownInterval != null) {
        clearInterval(this.countdownInterval)
      }
      this.countdownInterval = setInterval(this.countdown, 1000)
      clearInterval(this.awaitingInterval)
    },
    gameEnd (e) {
      console.log('> Play: Game ended')
      this.score = e.detail[0]
      this.$store.commit('SET_GAME_STATE', 'ended')
      clearInterval(this.countdownInterval)
      this.gameCountdown = 0
      this.gameCountdownFormatted = ['00','00']
    },
    abort () {
      this.$store.state.ws.send('abort')
      this.$store.state.team = ''
      this.$store.state.buosDisposition = 0
      this.inGameModal = false
      this.step = 1
    },
    close () {
      if (!this.closeConfirmation) {
        this.closeConfirmation = true
      } else {
        setTimeout(() => {
          this.closeConfirmation = false
        }, 500)
        window.lastScore = this.score
        this.abort()
      }
    }
  }
}
</script>

<style scoped>
.play-dialog {
  position: relative;
  background: white;
}
.armed {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s ease-in-out;
}
.abort-btn {
  position: absolute;
  top: 1em;
  left: 1em;
  z-index: 1;
}
.team-mosaic {
  padding-top: 2em;
  padding-bottom: 2em;
  display: flex;
  margin: auto;
  max-width: 500px;
  justify-content: space-around;
}
.team {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10em;
  height: 10em;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  opacity: 1;
}
.team.hidden {
  opacity: 0.8;
  transform: scale(0.8);
}
.team.realSelected {
  transform: scale(1.2);
}
.team:focus {
  opacity: 0.5;
}
.team:hover {
  opacity: 1;
}

.playing-header {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.playing-header-title {
  height: 100%;
  display: flex;
  align-items: center;
}

.playing-header-meta {
  display: flex;
  align-items: center;
}

.playing-logo {
  height: 100%;
  margin-right: 1em;
  transform: scale(1.5);
}

.game-over {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.play-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.play-dialog {
  position: relative;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .5s;
}

.fade-enter-active {
  transition-delay: .5s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.play-dialog-content {
  height: 100%;
  width: 100%;
  background: white;
}
</style>