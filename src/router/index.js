/**
 * Create by 郭大力 2019年12月9日13:54:34
 * 路由处理
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import {Home,Body} from '../layout/';

const Login = () => import('../components/Login/Login.vue');
const Index = () => import('../components/Index/Index.vue');
const _404 = () => import ('../components/404/404.vue');
const _403 = ()=> import('../components/403/403.vue');
const Permission = ()=> import('../components/Permission/Permission.vue');

const routerCfg = {
    'Login': Login,
    'Home': Home,
    'Body': Body,
    'Index':Index,
    '_404':_404,
    '_403':_403,
    'Permission':Permission
};

let env = process.env;
let promiseDef;


if (env['NODE_ENV'] === 'development') {//开发环境
    promiseDef = import("../config/router_config.json");
}
// else {//生成环境
//     let defaultUrl = 'static/config/routerConfig.json?' + new Date().getTime();
//     promiseDef = Vue.axios({
//         methods: 'get',
//         headers: {},
//         url: defaultUrl,
//         baseURL: ''
//     });
// }

/**
 * 递归解析路由配置
 * @param cfgs
 */

function parseRouter(cfgs) {
    for (let i = 0; i < cfgs.length; i++) {
        debugger;
        if (routerCfg[cfgs[i]['component']]) {
            debugger;
            cfgs[i]['component'] = routerCfg[cfgs[i]['component']]
        } else {
            // cfgs[i]['component'] = NotFound;
            cfgs[i]['component'] = _404;
        }
        if (cfgs[i]['children'])
            parseRouter(cfgs[i]['children'])
    }
}

async function routerAsyncFun(callfun) {
    try {
        debugger;
        console.log(Vue);
        const res = await promiseDef;
        let routes = env['NODE_ENV'] === 'development' ? res.default : res.data;

    //     let routes =  [
    //     {
    //         path: '/',
    //         redirect: '/dashboard'
    //     },
    //     {
    //         path: '/',
    //         component: () => import(/* webpackChunkName: "home" */ '../components/Login/Login.vue'),
    //         meta: { title: '自述文件' },
    //         children: [
    //             {
    //                 path: '/dashboard',
    //                 component: () => import(/* webpackChunkName: "dashboard" */ '../components/Permission/Permission.vue'),
    //                 meta: { title: '系统首页' }
    //             },
    //             {
    //                 path: '/icon',
    //                 component: () => import(/* webpackChunkName: "icon" */ '../components/Index/Index.vue'),
    //                 meta: { title: '自定义图标' }
    //             },
    //             {
    //                 path: '/404',
    //                 component: () => import(/* webpackChunkName: "table" */ '../components/404/404.vue'),
    //                 meta: { title: '基础表格' }
    //             },
    //             {
    //                 path: '/tabs',
    //                 component: () => import(/* webpackChunkName: "tabs" */ '../components/403/403.vue'),
    //                 meta: { title: 'tab选项卡' }
    //             }
    //         ]
    //     },
    //     {
    //         path: '/login',
    //         component: () => import(/* webpackChunkName: "login" */ '../components/Login/Login.vue'),
    //         meta: { title: '登录' }
    //     },
    //     {
    //         path: '*',
    //         redirect: '/404'
    //     }
    // ];
        
        parseRouter(routes);
        debugger;
        callfun(new Router({
            routes: routes
        }))
    } catch (err) {
        debugger;
        console.log(err);
        callfun(new Router({
            routes: []
        }))
    }
}
export default {
    routerAsyncFun
};




// export default new Router({
//     routes: [
//         {
//             path: '/',
//             redirect: '/tabs'
//         },
//         {
//             path: '/',
//             component: () => import(/* webpackChunkName: "home" */ '../layout/Home/Home.vue'),
//             meta: { title: '自述文件' },
//             children: [
//                 {
//                     path: '/icon',
//                     component: () => import(/* webpackChunkName: "icon" */ '../components/403/403.vue'),
//                     meta: { title: '自定义图标' }
//                 },
//                 {
//                     path: '/table',
//                     component: () => import( webpackChunkName:"table"  '../components/404/404.vue'),
//                     meta: { title: '基础表格' }
//                 },
//                 {
//                     path: '/tabs',
//                     component: () => import(/* webpackChunkName: "tabs" */ '../components/Permission/Permission.vue'),
//                     meta: { title: 'tab选项卡' }
//                 }
//             ]
//         },
//         {
//             path: '/login',
//             component: () => import(/* webpackChunkName: "login" */ '../components/Login/Login.vue'),
//             meta: { title: '登录' }
//         },
//         {
//             path: '*',
//             redirect: '/404'
//         }
//     ]
// });