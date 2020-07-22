<template>
  <v-card flat>
    <div class="d-flex w-100 justify-center">
      <v-fab-transition>
        <v-btn
          :color="$store.state.color"
          dark
          @click="dialog = true"
          large
          absolute
          fixed
          fab
          bottom 
          right
          class="mb-12 mr-6"
        >
          <v-icon large>mdi-cog</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>
    <v-dialog v-model="dialog" max-width="290">
      <v-card class="jppCnimporteqoiEnfaite">
        <p class="headline text-center pt-3">Modes</p>
        <v-list rounded>
          <v-list-item-group :color="$store.state.color" v-model="mode">
            <v-list-item
              v-for="(item, i) in $store.state.debugModes"
              :key="i"
            >
          <v-list-item-content>
            <v-list-item-title @click="mode = item; dialog = false" v-text="item"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
        <v-card-actions>
          <v-btn
            :color="$store.state.color"
            block
            dark
            @click="dialog = false"
            >Fermer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Laser v-if="$store.state.debugModes[mode] == 'Laser'"/>
    <Match v-if="$store.state.debugModes[mode] == 'Match'"/>
  </v-card>
</template>

<script>
import Laser from "./Laser"
import Match from "./Match"


export default {
  name: "Debug",
  
  components: {
    Match,
    Laser,
  },

  data: () => ({
    mode : 0,
    dialog: false
  })
};
</script>
