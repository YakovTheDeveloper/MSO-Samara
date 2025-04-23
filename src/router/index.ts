import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router';
import ForestHome from '@/views/forest/ForestHome.vue';


const routeComponents: Record<string, any> = {
  '/forest': ForestHome,
};

const routes: RouteRecordRaw[] = Object.entries(routeComponents).map(([path, component]) => ({
  path,
  component,
}));

export const router = createRouter({
  history: createWebHistory(),
  routes
});