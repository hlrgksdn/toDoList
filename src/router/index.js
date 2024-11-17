import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Information from '../components/Information.vue'
import Settings from '../components/Settings.vue'
import Statistic from '../components/Statistic.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', // Используйте "history mode" для ЧПУ
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'settings',
      path: '/settings',
      component: Settings
    },
    {
      name: 'statistic',
      path: '/statistic',
      component: Statistic
    },
    {
      name: 'information',
      path: '/information',
      component: Information
    }
  ]
})
