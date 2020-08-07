import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Debug',
      component: () => import(/* webpackChunkName: "debug" */ './views/Debug.vue')
    },
    {
      path: '/map',
      name: 'Map',
      component: () => import(/* webpackChunkName: "map" */ './views/Map.vue')
    },
    {
      path: '/todo',
      name: 'Todo',
      component: () => import(/* webpackChunkName: "todo" */ './views/Todo.vue')
    },
    {
      path: '/play',
      name: 'Play',
      component: () => import(/* webpackChunkName: "play" */ './views/Play.vue')
    }
  ]
})
