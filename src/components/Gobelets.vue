<template>
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
</template>

<script>
export default {
  name: "Gobelets",

  data: () => ({})
};
</script>
