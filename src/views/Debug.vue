<template>
  <div>
    <v-list>
      <v-list-item>
        <v-list-item-title>
          Contrôle de l'ascenseur
        </v-list-item-title>
        <v-list-item-action>
          <v-btn outlined>
            RESET
          </v-btn>
          <v-btn outlined>
            200
          </v-btn>
          <v-btn outlined>
            300
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          Contrôle de l'ascenseur
        </v-list-item-title>
        <v-list-item-action>
          <v-btn outlined>
            RESET
          </v-btn>
          <v-btn outlined>
            200
          </v-btn>
          <v-btn outlined>
            300
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('SET_TITLE', "Debug")
  }
}
</script>