
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import {Home,Body} from '../layout/routeview/';

const Login = () => import('../components/Login/Login.vue');
const Index = () => import('../components/Index/Index.vue');
const _404 = () => import ('../components/404/404.vue');
const _403 = ()=> import('../components/403/403.vue');
const Permission = ()=> import('../components/Permission/Permission.vue');
const MisManage =()=>import('../components/MisManage/MisManage.vue');
const IndexStatic =()=>import('../components/IndexStatic/IndexStatic.vue');

const routerCfg = {
    'Login': Login,
    'Home': Home,
    'Body': Body,
    'Index':Index,
    '_404':_404,
    '_403':_403,
    'Permission':Permission,
    'MisManage':MisManage,
    'IndexStatic':IndexStatic
};

/**
 * 递归解析路由配置
 * @param cfgs
 */

function parseRouter(cfgs) {
    for (let i = 0; i < cfgs.length; i++) {
        if (routerCfg[cfgs[i]['component']]) {
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
        // const res = await promiseDef;
        // let routes = env['NODE_ENV'] === 'development' ? res.default : res.data;

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

    let routes =  [
      {
        "path": "/",
        "name": "登录",
        "hidden": true,
        "component": "Login"
      },
      {
        "path": "/login",
        "name": "登录",
        "hidden": true,
        "component": "Login"
      },
      {
        "path": "/indexStatic",
        "name": "总体概览",
        "component": "Body",
        "redirect": "/indexStatic",
        "children": [
          {
            "path": "/indexStatic",
            "name": "总体概览",
            "component": "IndexStatic"
          }
        ]
      },
      {
        "path": "/home",
        "name": "首页",
        "component": "Body",
        "redirect": "/home",
        "children": [
          {
            "path": "/home",
            "name": "首页",
            "component": "Index"
          }
        ]
      },
      {
        "path": "/warningAnalysis",
        "name": "预警分析",
        "icon": "icon-3clear-curve-e",
        "component": "Home",
        "redirect": "/warningAnalysis/warningList",
        "children": [
          {
            "path": "warningList",
            "name": "预警列表",
            "icon": "fa fa-map",
            "component": "MisManage"
          },
          {
            "path":"warningSet",
            "name": "预警设置",
            "icon": "fa fa-map",
            "component": "MisManage",
          },
          {
            "path": "AAAAA",
            "name": "预警列表新增",
            "hidden": true,
            "icon": "fa fa-map",
            "component": "_404",
            "meta": { "routerNoChange": true }
          },
          {
            "path":"BBBBB",
            "name": "BBBBB",
            "hidden": true,
            "icon": "fa fa-map",
            "component": "_404",
          }
        ]
      },
      {
        "path": "/monitorAanlysis",
        "name": "监测分析",
        "icon": "icon-3clear-curve-e",
        "component": "Home",
        "redirect": "/monitorAanlysis/monitorInfo",
        "children": [
          {
            "path": "monitorInfo",
            "name": "监测信息",
            "icon": "fa fa-map",
            "component": "_404"
          },
          {
            "path": "monitorData",
            "name": "监测数据",
            "icon": "fa fa-map",
            "component": "MisManage"
          }
        ]
      }
    ];
        
        parseRouter(routes);
        callfun(new Router({
            routes: routes
        }))
    } catch (err) {
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