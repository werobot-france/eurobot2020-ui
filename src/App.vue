<template>
  <v-app>
    <v-main class="ma-0 pa-0">
      <v-card flat class="w-100 rounded-0 elevation-0" color="white">
        <v-tabs
          dark
          v-model="$store.state.tab"
          :background-color="$store.state.color"
          grow
          icons-and-text
          centered
        >
          <v-tab key="0"
            >Équipe<v-icon small>mdi-diving-scuba-flag</v-icon></v-tab
          >
          <v-tab key="1">Gobelets<v-icon small>mdi-beer</v-icon></v-tab>
          <v-tab key="2">Debug<v-icon small>mdi-bug</v-icon></v-tab>
          <v-tab key="3">Score<v-icon small>mdi-counter</v-icon></v-tab>
        </v-tabs>
        <div class="w-100 gobelets-bar px-5">
          <v-row>
            <v-col cols="6 d-flex ma-0 pa-0">
              <div
                :key="(gobelet + 66) * Math.random(0, 999)"
                v-for="gobelet in $store.state.configs[
                  $store.state.gobelets - 1
                ]"
                :style="'background-color:' + getGobColor(gobelet)"
                class="gob rounded-circle"
              ></div>
            </v-col>
            <v-col cols="6 d-flex ma-0 pa-0 justify-end">
              <div
                :key="(gobelet + 66) * Math.random(0, 999)"
                v-for="gobelet in $store.state.configs2[
                  $store.state.gobelets - 1
                ]"
                :style="'background-color:' + getGobColor(gobelet, true)"
                class="gob rounded-circle"
              ></div>
            </v-col>
          </v-row>
        </div>

        <v-tabs-items v-model="$store.state.tab" class="w-100 pb-0">
          <v-tab-item key="0" class="w-100 h-100">
            <Teams />
          </v-tab-item>

          <v-tab-item key="1">
            <Gobelets />
          </v-tab-item>

          <v-tab-item key="2">
            <Debug />
          </v-tab-item>

          <v-tab-item key="3" class="w-100 h-100">
            <Score />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import Teams from "./components/Teams"
import Score from "./components/Score"
import Debug from "./components/Debug"
import Gobelets from "./components/Gobelets"
import WebSocketService from "./WebSocketService"

export default {
  name: "App",

  components: {
    Teams,
    Score,
    Debug,
    Gobelets
  },

  data() {
    return {}
  },
  mounted() {
    this.$store.commit('SET_WS', new WebSocketService("192.168.43.133:8082"));
  },
  methods: {
    getGobColor(c, inversed = false) {
      if (c == 0) {
        if (inversed) {
          return "#388e3c";
        }
        return "#d84315";
      }
      if (c == 1) {
        if (inversed) {
          return "#d84315";
        }
        return "#388e3c";
      }
    }
  }
};
</script>
