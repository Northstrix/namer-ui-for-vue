import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Components from '../views/Components.vue';
import ComponentPage from '../views/ComponentPage.vue';
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/components', name: 'Components', component: Components },
    { path: '/components/:name', name: 'ComponentPage', component: ComponentPage, props: true },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
    // 👇 This will scroll to the top on every navigation
    scrollBehavior(to, from, savedPosition) {
        // Always scroll to top
        return { left: 0, top: 0 };
    }
});
export default router;
//# sourceMappingURL=index.js.map