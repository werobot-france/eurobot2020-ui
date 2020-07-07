<template>
  <v-card flat>
    <p class="text-center text-h3 mt-2 mb-12">100s</p>
    <v-row class="mt-n10 px-2">
      <v-col cols="6">
        <p class="text-button ma-0 pa-0 text-center">Infos</p>
        <v-card color="blue-grey lighten-5 pa-1">
          <p class="text-body-2 ma-0 pa-0 my-1">RobotPosition : (0,0)</p>
          <p class="text-body-2 ma-0 pa-0 my-1">Orientation : 90°</p>
          <v-divider></v-divider>
          <p class="text-body-2 ma-0 pa-0 my-1">TargetPosition : (0,0)</p>
          <p class="text-body-2 ma-0 pa-0 my-1">TargetDeltaAngle : 45°</p>
          <v-divider></v-divider>
          <p class="text-body-2 ma-0 pa-0 my-1">moteurs : [0,0,0,0]</p>
        </v-card>
      </v-col>
      <v-col cols="6">
        <p class="text-button ma-0 pa-0 text-center">Actions</p>
        <v-card color="blue-grey lighten-5 pa-1">
          <p class="text-subtitle-1 font-weight-medium ma-0 pa-0 my-1">
            Dépasser le 2ème pour être 1er
          </p>
          <p class="text-body-2 ma-0 pa-0 my-1">Faire un salto arrière</p>
          <p class="text-body-2 ma-0 pa-0 my-1">Daber</p>
          <p class="text-body-2 ma-0 pa-0 my-1">
            Résoudre tout les problèmes de l'humanité
          </p>
          <p class="text-body-2 ma-0 pa-0 my-1">Acheter du pain</p>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Debug",

  data: () => ({})
};
</script>
