import Vue from 'vue'
import Router from 'vue-router'
import New from '../pages/new/New.vue'
import View from '../pages/view/View.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/new',
      component: New
    },
    {
      path: '/view',
      component: View
    },
    {
      path: '/',
      redirect: '/new'
    }
  ]
})
