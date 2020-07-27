<template>
  <div>
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
        <div class="text-center">
          <div>
            Armed, awaiting game start!
          </div>
          <div>
            Be confident that it will not be a total disaster. I'm trusting my self!
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    inGameModal: false,
    awaitingColor: 'red',
    awaitingColors: [
      'red',
      'orange',
      'yellow',
      'teal'
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
}
</style>