import Vue from 'vue'
import Router from 'vue-router'
import New from '../pages/new/New.vue'
import View from '../pages/view/View.vue'
import Edit from '../pages/edit/Edit.vue'

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
      path: '/edit',
      component: Edit
    },
    {
      path: '/',
      redirect: '/new'
    }
  ]
})
