import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import ForestHome from '@/views/forest/ForestHome.vue'
import Cd1Home from '@/views/cd1/Cd1Home.vue'
import Cd2Home from '@/views/cd2/Cd2Home.vue'
import Cd2FullDesc from '@/views/cd2/Cd2FullDesc.vue'
import Cd2List from '@/views/cd2/Cd2List.vue'

const routeComponents: Record<string, any> = {
  '/forest': ForestHome,
  '/cd1': Cd1Home,
  '/cd2/': Cd2Home,
  '/cd2/desc': Cd2FullDesc,
  '/cd2/list': Cd2List,
  '/cd2vertical/': Cd2Home,
  '/cd2vertical/desc': Cd2FullDesc,
  '/cd2vertical/list': Cd2List,
}

const routes: RouteRecordRaw[] = Object.entries(routeComponents).map(([path, component]) => ({
  path,
  component,
}))

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
