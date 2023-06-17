import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

import * as bootstrap from 'bootstrap'
import * as VueRouter from 'vue-router'

import Home from './pages/Home.vue'
import Register from './pages/Register.vue'
import Login from './pages/Login.vue'
import Dashboard from './pages/Dashboard.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard, name: 'dashboard' },
    { path: '/categories', component: () => import('./pages/Categories.vue'), name: 'categories' },
    { path: '/categories/:id', component: () => import('./pages/Category.vue'), name: 'category' },
    { path: '/products/new', component: () => import('./pages/NewProduct.vue'), name: 'newproduct' },
    { path: '/products/:id', component: () => import('./pages/Product.vue'), name: 'product' },
    { path: '/products/:id/edit', component: () => import('./pages/EditProduct.vue'), name: 'editProduct' },
    { path: '/seen', component: () => import('./pages/Seen.vue'), name: 'seen' },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

createApp(App)

.use(router)

.mount('#app')
