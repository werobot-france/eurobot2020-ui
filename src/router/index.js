import Vue from "vue"
import VueRouter from "vue-router"
import V1Layout from "../layouts/V1Layout.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/v1",
    name: "V1Layout",
    component: V1Layout
  },
  {
    path: "/v2",
    name: "V2Layout",
    component: () => import(/* webpackChunkName: "v2Layout" */ '../layouts/V2Layout.vue'),
    children: [
      {
        path: '/',
        name: 'Debug',
        component: () => import(/* webpackChunkName: "v2LayoutDebug" */ '../views/Debug.vue')
      },
      {
        path: '/map',
        name: 'Map',
        component: () => import(/* webpackChunkName: "v2LayoutMap" */ '../views/Map.vue')
      },
      {
        path: '/todo',
        name: 'Todo',
        component: () => import(/* webpackChunkName: "v2LayoutTodo" */ '../views/Todo.vue')
      },
      {
        path: '/play',
        name: 'Play',
        component: () => import(/* webpackChunkName: "v2LayoutPlay" */ '../views/Play.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
