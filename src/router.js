import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Map from './views/Map.vue'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                showReturnBtn: false
            }
        },
        {
            path: '/map/:category',
            name: 'Map',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            //component: () => import(/* webpackChunkName: "about" */ './views/Map.vue')
            component: Map,
            meta: {
                showReturnBtn: true
            }
        }
    ]
})

export default router

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
});
