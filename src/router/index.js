import { createRouter, createWebHashHistory } from 'vue-router'
import getPageTitle from '@/utils/getPageTitle'
import Layout from '@/layout/index.vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
    {
        path: '/login',
        name: 'Login',
        meta: { title: '登录' }, 
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/register',
        name: 'Register',
        meta: { title: '注册' }, 
        component: () => import('../views/login/register.vue')
    },
    {
        path: '/:w+',
        name: '*',
        component: Layout,
        redirect: '/'
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'Home',
                meta: { title: '逻辑关系' }, 
                component: () => import('../views/index/index.vue')
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/config',
                name: 'GameConfig',
                meta: { title: '游戏配置' }, 
                component: () => import('../views/config/index.vue')
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/robot',
                name: 'RobotConfig',
                meta: { title: '机器人配置' }, 
                component: () => import('../views/robot/index.vue')
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/setting',
                name: 'User',
                meta: { title: '个人中心' }, 
                component: () => import('../views/user/index.vue')
            },
        ]
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})


const whiteList = ['/login', '/register'] // no redirect whitelist

router.beforeEach((to, from, next) => {
    NProgress.start()
	//页面title
	document.title = getPageTitle(to.meta.title)
	const hasToken = localStorage.loginData
	if (hasToken) {
		if (to.path === '/login' || to.path === '/register') {
			next({ path: '/' })
		}else {
			next()
		}
        NProgress.done()
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			// 在免登录白名单，直接进入
			next()
            NProgress.done()
		} else {
			// other pages that do not have permission to access are redirected to the login page.
			next({ path: '/login' })
			NProgress.done()
		}
	}
	
})



export default router