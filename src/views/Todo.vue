<template>
  <v-row class="justify-center">
    <v-col cols="12" sm="12" md="10" lg="9" xl="6" class="pt-0">
      <v-card flat class="w-100 h-100 rounded-0 pa-3 pt-0">
        <v-row class="px-4 pt-0">
          <v-col cols="6">
            <div class="mt-0 pt-2">
              <p class="text-center w-100 text-h6 mb-2 font-weight-bold">À faire</p>
              <div v-for="(a, i) in actionsToDo" :key="i" v-show="!a.checked">
                <v-list-item @click="a.checked = !a.checked" class="my-2 rounded-lg elevation-3">
                  <v-list-item-content>
                    <p class="text-subtitle-1 text-center font-weight-medium">{{a.name}}</p>
                    <p class="text-caption ma-0">{{a.precision }}</p>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </div>
          </v-col>
          <v-col cols="6">  
            <div class="mt-0 pt-2">
              <p class="text-center w-100 text-h6 mb-2 font-weight-bold">Fait</p>
              <div v-for="(a, i) in actionsToDo" :key="i" v-show="a.checked">
                <v-list-item @click="a.checked = !a.checked" class="my-2 rounded-lg elevation-3">
                  <v-list-item-content>
                    <p class="text-subtitle-1 text-center font-weight-medium">{{a.name}}</p>
                    <p class="text-caption ma-0">{{a.precision }}</p>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    actionsToDo: [
      {name: "ESC", precision: "Verifier qu'ils sont tous bien allumés", checked: false},
      {name: "Phare", precision: "Fixer et alimenter le phare", checked: false},
      {name: "Bouton d'arêt d'urgence", precision: "Verifier qu'il n'est pas appuyé lol", checked: false},
      {name: "Manger", precision: "Consommer des chocolatines de manière décente si possible", checked: false},
      {name: "Gagner", precision: "bien évidement", checked: false}
    ]
  })
}
</script>
