import Vue from 'vue'
import Router from 'vue-router'
import New from '../pages/new/New.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/new',
      component: New
    },
    {
      path: '/',
      redirect: '/new'
    }
  ]
})
