import Vue from "vue"
import Vuetify from "vuetify/lib"
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  
  theme: {
    themes: {
      light: {
        primary: colors.blue.base,
        accent: colors.blue.lighten3,
        error: colors.red.darken2
      }
    }
  }

})
