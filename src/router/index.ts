import Forest from '@/views/forest.vue';
import About from '@/views/forest/about/about.vue';
import Mso from '@/views/forest/mso/Mso.vue';
import MsoItem from '@/views/forest/mso/MsoItem.vue';
import News from '@/views/forest/news/news.vue';
import NewsItem from '@/views/forest/news/NewsItem.vue';
import Layout from '@/views/shared/layout.vue';
import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router';


const routeComponents: Record<string, any> = {
  '/forest/news': News,
  '/forest/mso': Mso,
  '/forest/walk': null,
  '/forest/about': About,
  '/forest/ecosystem': null,
  '/forest/support': null,
  '/forest/young-russia': null,
  '/forest/our-resources': null,
  '/forest/events': null,
};

const forestRoutes: RouteRecordRaw[] = Object.entries(routeComponents).map(([path, component]) => ({
  path,
  component,
}));

export const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/forest/home',
    component: Forest,
  }, {
    path: '/forest',
    component: Layout,
    children: [...forestRoutes, {
      path: '/forest/news/:id',
      component: NewsItem
    }, {
      path: '/forest/mso/:id',
      component: MsoItem
    }]
  }]
});