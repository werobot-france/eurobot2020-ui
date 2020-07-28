<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" xs="12" sm="6" class="py-0">
            <div style="color: red;" class="mb-1">
              X: 10.00 mm
            </div>
            <div style="color: green;" class="mb-1">
              Y: 100.00 mm
            </div>
            <div style="color: purple;">
              θ: 125.00 °
            </div>
          </v-col>
          <v-col cols="12" xs="12" sm="6" class="py-0">
            <div style="color: gray;" class="mb-1">
              Elevator step: 500 steps
            </div>
            <div style="color: gray;">
              Claw angle: 10°
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-list class="mt-2">
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Elevator control
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <div class="d-flex justify-center align-items">
            <v-btn outlined color="red" class="mr-2" small>
              RESET
            </v-btn>
            <v-btn outlined color="green" class="mr-2" small>
              200
            </v-btn>
            <v-btn outlined color="green" small>
              300
            </v-btn>
          </div>
        </v-list-item-action>
      </v-list-item>
      <v-divider />

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Claw control
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <div class="d-flex justify-center align-items">
            <v-btn outlined color="blue" small>
              Toggle
            </v-btn>
          </div>
        </v-list-item-action>
      </v-list-item>
      <v-divider />

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Navigation
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <div class="d-flex justify-center align-items">
            <v-btn outlined color="blue" small>
              Go To
            </v-btn>
          </div>
        </v-list-item-action>
      </v-list-item>
      <v-divider />
    </v-list>
    <v-dialog v-model="elevatorDialog">
      <v-card>
        <v-card-title>
          Gérer l'ascenseur
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    elevatorDialog: false
  }),
  mounted() {
    this.$store.commit('SET_TITLE', "Debug")
  }
}
</script>il