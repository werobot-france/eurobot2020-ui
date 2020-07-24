<template>
  <v-app>
    <v-main class="ma-0 pa-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import WebSocketService from "./WebSocketService"

export default {
  name: "App",

  data: () => ({}),

  mounted() {
    this.$store.commit('SET_WS', new WebSocketService("192.168.43.133:8082"))
  }
}
</script>
