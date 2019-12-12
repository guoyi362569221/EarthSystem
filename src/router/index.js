/**
 * Create by 郭大力 2019年12月9日13:54:34
 * 路由处理
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/tabs'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../layout/Home/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/403/403.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/404/404.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/Permission/Permission.vue'),
                    meta: { title: 'tab选项卡' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/Login/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
