<template>
  <v-container class="pt-0">
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="10" lg="8" xl="6">
        <v-list class="mb-2">
          <v-divider />
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Server address</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn outlined color="primary" small @click="openAddressModal()">
                Change
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider />
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Identifier</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn outlined color="primary" small @click="openIdentifierModal()">
                Change
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider />
        </v-list>
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
      </v-col>
    </v-row>
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
    <v-dialog v-model="addressModal" max-width="500px">
      <v-card>
        <v-card-title>Change server address</v-card-title>
        <v-card-text>
          <v-text-field v-model="serverAddress" label="IP:PORT" />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="addressModal = false">Close</v-btn>
          <v-spacer />
          <v-btn text color="success" @click="saveAddress()">Set & Reload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="identifierModal" max-width="500px">
      <v-card>
        <v-card-title>Change client identifier</v-card-title>
        <v-card-text>
          <v-text-field v-model="clientIdentifier" label="Label" />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="identifierModal = false">Close</v-btn>
          <v-spacer />
          <v-btn text color="success" @click="saveIdentifier()">Set & Reload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    elevatorDialog: false,
    addressModal: false,
    serverAddress: '',
    clientIdentifier: '',
    identifierModal: false
  }),
  mounted() {
    this.$store.commit('SET_TITLE', "Debug")
  },
  methods: {
    openAddressModal () {
      this.addressModal = true
      this.serverAddress = this.$store.state.ws.getAddress()
    },
    saveAddress () {
      this.$store.state.ws.changeAddress(this.serverAddress)
      this.addressModal = false
    },
    saveIdentifier () {
      this.$store.state.ws.changeIdentifier(this.serverAddress)
      this.identifierModal = false
    },
    openIdentifierModal () {
      this.identifierModal = true
      this.clientIdentifier = this.$store.state.ws.getIdentifier()
    }
  }
}
</script>il