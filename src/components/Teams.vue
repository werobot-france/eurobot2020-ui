<template>
  <v-card flat class="w-100 h-100 rounded-0">
    <v-row class="ma-0 pa-0 h-100 w-100 pb-5">
      <v-col cols="6" class="pa-0 ma-0 h-100 w-100 py-12 px-5">
        <v-card
          class="w-100 h-100 rounded-lg pb-12"
          :color="$store.state.colors.yellow"
          @click="$store.state.color = $store.state.colors.yellow"
        >
          <p class="text-button pt-12 text-center white--text">Côté lumineux</p>
        </v-card>
      </v-col>
      <v-col cols="6" class="pa-0 ma-0 h-100 w-100 py-12 px-5">
        <v-card
          class="w-100 h-100 rounded-lg pb-12"
          :color="$store.state.colors.purple"
          @click="$store.state.color = $store.state.colors.purple"
        >
          <p class="text-button pt-12 text-center white--text">Côté obscur</p>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Teams",

  data: () => ({})
};
</script>
