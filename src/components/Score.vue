<template>
  <v-row class="pa-0 ma-0">
    <v-col class="ma-0 pa-0" cols="2"></v-col>
    <v-col class="ma-0 pa-0" cols="8">
      <v-card dark flat class="d-flex justify-center align-center flex-column w-100 rounded-lg my-10 pt-5" :color="$store.state.color">
        <p class="text-h5 text-center">
          je pense la question est vite répondu :
        </p>
        <p class="text-h1 text-center ">{{ $store.state.score }}</p>
      </v-card>
    </v-col>
    <v-col class="ma-0 pa-0" cols="2"></v-col>
  </v-row>
</template>

<script>
export default {
  name: "Score",

  data: () => ({})
};
</script>
