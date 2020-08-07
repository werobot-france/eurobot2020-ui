<template>
  <v-app>
    <v-main>
      <v-toolbar color="primary" dark flat>
        <!-- <v-toolbar-title>{{ $store.state.title }}</v-toolbar-title>
        <v-spacer></v-spacer> -->
        <!-- <v-menu bottom close-on-content-click>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mr-2"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="openPreviewModal()">
              <v-list-item-title>Prévisualiser votre page</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goToPage()">
              <v-list-item-title>Ouvrir la page publique</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout()">
              <v-list-item-title>Se déconnecter</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->
        <!--
        <v-btn icon @click="goToPage()">
          <v-icon>open_in_new</v-icon>
        </v-btn>
        <v-btn icon @click="logout()">
          <v-icon>exit_to_app</v-icon>
        </v-btn> -->

        <v-tabs
          v-model="tab"
          icons-and-text
          centered
          show-arrows
          slider-color="accent"
          ref="tabs"
        >
          <v-tab @click="navigate('Debug')">
            Debug
          </v-tab>
          <v-tab @click="navigate('Map')">
            Map
          </v-tab>
          <v-tab @click="navigate('Todo')">
            Todo
          </v-tab>
          <v-tab @click="navigate('Play')">
            Play
          </v-tab>
        </v-tabs>
        <v-btn
          icon
          disabled
          style="position: absolute; right: 1em;">
          <v-icon v-if="$store.state.isConnected">wifi_tethering</v-icon>
          <v-icon v-else>portable_wifi_off</v-icon>
        </v-btn>
      </v-toolbar>
      <router-view />
      <v-snackbar
        :value="!$store.state.isConnected"
        :timeout="-1"
        color="error">
        Olallala
      </v-snackbar>
      <GlobalSnackbar />
    </v-main>
  </v-app>
</template>

<script>
import WebSocketService from "./WebSocketService"
import GlobalSnackbar from './components/GlobalSnackbar'

export default {
  components: {
    GlobalSnackbar
  },
  data: () => ({
    tab: 0,
    hasError: false
  }),
  watch: {
    $route (to) {
      this.selectRoute(to)
    }
  },
  created () {
    let ws = new WebSocketService(this.$store.state.address)

    ws.start()
    ws.on('connectionUpdated', 'connection', e => {
      this.$store.commit('SET_IS_CONNECTED', e.detail)
      if (e.detail) {
        this.$store.commit('ADD_ALERT', { color: 'success', text: 'Connected!' })
      }
    })
    this.$store.commit('SET_WS', ws)
  },
  mounted () {
    //this.$store.commit('SET_TITLE', "Panel")
    this.selectRoute(this.$route)
  },
  methods: {
    navigate (routeName) {
      if (routeName !== this.$route.name) {
        this.$router.push({ name: routeName })
      }
    },
    selectRoute (route) {
      const path = route.path.split('/')
      const name = path[path.length - 1]
      const routes = ['', 'map', 'todo', 'play']
      this.tab = routes.indexOf(name)
    }
  }
}
</script>