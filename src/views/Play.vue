<template>
  <v-container>
    <v-stepper v-model="step">
      <v-stepper-items>
        <v-stepper-content
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
          step="2"
        >
          <div class="team-mosaic">
            <div
              v-for="team in [['purple', 'purple', 'Purple'], ['yellow', 'amber', 'Yellow']]"
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
            <v-btn @click="startGame()" color="primary">
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

    <v-dialog
      v-model="inGameModal"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      class="play-dialog m-auto">
      <v-btn
        class="abort-btn" icon dark outlined
        @click="abort()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card
        v-if="$store.state.playState == 'armed'"
        tile
        :class="awaitingColor"
        class="armed">
        <div class="text-center white--text" style="max-width: 500px;">
          <div class="text-h3">
            Armed, awaiting game start!
          </div>
          <div class="text-h6 mt-4">
            Be confident that it will not be a total disaster. I'm trusting my self!
          </div>
        </div>
      </v-card>
      <v-card
        v-if="$store.state.playState == 'playing'"
        tile>
        <v-card-text>
          Playing...
        </v-card-text>
      </v-card>
      <v-card
        v-if="$store.state.playState == 'done'"
        tile>
        <v-card-text>
          Playing...
        </v-card-text>
      </v-card>
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
      'red',
      'pink',
      'purple',
      'deep-purple',
      'indigo',
      'blue',
      'cyan',
      'teal',
      'green',
      'light-green',
      'orange'
    ]
  }),
  methods: {
    startGame () {
      this.inGameModal = true
      let i = 0
      setInterval(() => {
        this.awaitingColor = this.awaitingColors[i]
        i++
        if (i >= this.awaitingColors.length) {
          i = 0
        }
      }, 1000)
    },
    abort () {
      this.$store.state.team = ''
      this.$store.state.buosDisposition = 0
      this.inGameModal = false
      this.step = 1
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
</style>