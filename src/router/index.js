import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard'
import Forms from '@/components/forms/index.vue'
import Tables from '@/components/tables/index.vue'
import Widgets from '@/components/widgets/index.vue'
import Test from '@/components/test/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/forms',
      name: 'Forms',
      component: Forms
    },
    {
      path: '/tables',
      name: 'Tables',
      component: Tables
    },
    {
      path: '/widgets',
      name: 'Widgets',
      component: Widgets
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
