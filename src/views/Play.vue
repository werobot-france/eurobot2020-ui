<template>
  <v-container>
    <v-btn @click="startGame()" color="primary">
      Start Game
    </v-btn>
    <v-dialog
      v-model="inGameModal"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      class="m-auto">
      <v-card
        tile
        :class="awaitingColor"
        class="armed">
        <v-btn
          class="abort-btn" icon dark outlined
          @click="inGameModal = false">
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
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
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
    }
  }
}
</script>

<style scoped>
.armed {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s ease-in-out;
  position: relative;
}
.abort-btn {
  position: absolute;
  top: 1em;
  left: 1em;
}
</style>