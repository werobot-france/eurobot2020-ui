<template>
  <div class="ma-0 pa-0">
    <v-card flat class="w-100 h-100 rounded-0">
      <v-row class="ma-0 pa-0 h-100 w-100 mt-6 px-10">
        <v-col cols="6" class="pa-0 ma-0 h-100 w-100 py-3 px-5 mr-0 pr-0">
          <v-card
            class="w-100 h-100 rounded-0 rounded-l-xl py-5 mr-0"
            :color="$store.state.colors.yellow"
            @click="$store.state.color = $store.state.colors.yellow"
          >
            <p class="text-button text-center white--text">Côté lumineux</p>
          </v-card>
        </v-col>
        <v-col cols="6" class="pa-0 ma-0 h-100 w-100 py-3 px-5 ml-0 pl-0">
          <v-card
            class="w-100 h-100 rounded-0 rounded-r-xl py-5 ml-0"
            :color="$store.state.colors.purple"
            @click="$store.state.color = $store.state.colors.purple"
          >
            <p class="text-button text-center white--text">Côté obscur</p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-card flat class="pt-6">
    <v-row class="ma-0 pa-0 mb-n1" v-for="i in 3" :key="i">
      <v-col cols="1"></v-col>
      <v-col cols="9  d-flex justify-center align-center">
        <v-img
          @click="$store.state.gobelets = i"
          :src="'gobelets' + i + '.png'"
          class="w-100"
          contain
        ></v-img>
      </v-col>
      <v-col cols="2 d-flex justify-center align-center">
        <v-checkbox
          large
          v-model="$store.state.gobelets"
          :color="$store.state.color"
          :value="i"
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-card>
  </div>
</template>

<script>
export default {
  name: "Configuration",

  data: () => ({})
};
</script>
