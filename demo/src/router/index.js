import Vue from 'vue'
import Router from 'vue-router'
import Te1 from '@/pages/Template_1/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Te1',
      component: Te1
    }
  ]
})
