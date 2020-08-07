<template>
  <v-snackbar
    :right="!$vuetify.breakpoint.mobile"
    :color="$store.state.alert.color"
    v-model="$store.state.alert.enabled"
    :timeout="3500"
  >
    {{ $store.state.alert.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        v-bind="attrs"
        @click="$store.commit('DISABLE_ALERT')"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'GlobalSnackbar'
}
</script>
