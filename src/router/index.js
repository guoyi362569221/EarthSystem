
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import {Home,Body} from '../layout/routeview/';

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
        console.log(Vue);
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
        "path": "/homepage",
        "name": "首页",
        "component": "Body",
        "redirect": "/homepage/",
        "children": [
          {
            "path": "/homepage",
            "name": "首页",
            "component": "Permission"
          }
        ]
      },
      {
        "path": "/citypredict",
        "name": "预报分析",
        "icon": "icon-3clear-curve-e",
        "component": "Body",
        "redirect": "/citypredict/dismap",
        "children": [
          {
            "path": "dismap",
            "name": "区域模拟分析",
            "icon": "fa fa-map",
            "component": "_404"
          }
        ]
      },
      {
        "path": "/weapredict",
        "name": "气象分析",
        "icon": "icon-3clear-radar-c",
        "component": "Body",
        "redirect": "/weapredict/metesimuanalysis",
        "children": [
          {
            "path": "metesimuanalysis",
            "name": "气象模拟分析",
            "icon": "fa fa-cloud",
            "component": "_404"
          },
          {
            "path": "reference",
            "name": "气象实况参考",
            "icon": "fa fa-sitemap",
            "component": "_404"
          },
          {
            "path": "fdownload",
            "name": "气象预报参考",
            "icon": "fa fa-asterisk",
            "component": "_404"
          },
          {
            "path": "externallink",
            "name": "外部系统参考",
            "icon": "fa fa-window-restore",
            "component": "_404"
          }
        ]
      },
      {
        "path": "/citystatistic",
        "name": "预报会商",
        "icon": "icon-3clear-city",
        "component": "Home",
        "redirect": "/citystatistic/modelcorre",
        "children": [
          {
            "path": "modelcorre",
            "name": "人工订正",
            "icon": "fa fa-th-list",
            "component": "_404",
            "children": [
              {
                "path": "dismap1",
                "name": "区域模拟分析",
                "icon": "fa fa-map",
                "component": "_404"
              }
            ]
          },
          {
            "path": "forecastlog",
            "name": "预报简报",
            "icon": "fa fa-file-word-o",
            "component": "_404"
          },
          {
            "path": "message",
            "name": "短信发送",
            "icon": "fa fa-envelope",
            "component": "_404"
          },
          {
            "path": "warning",
            "name": "污染预警提示",
            "icon": "fa fa-bell",
            "component": "_404"
          },
          {
            "path": "report",
            "name": "信息上报",
            "icon": "fa fa-window-restore",
            "component": "_404"
          },
          {
            "path": "pptdown",
            "name": "PPT制作",
            "icon": "fa fa-_404-powerpoint-o",
            "component": "PPTDown"
          }
        ]
      },
      {
        "path": "/evaluate",
        "name": "评估分析",
        "icon": "icon-3clear-Leaf",
        "component": "Home",
        "redirect": "/evaluate/citycontrast",
        "children": [
          {
            "path": "citycontrast",
            "name": "城市对比分析",
            "icon": "fa fa-bar-chart",
            "component": "_404"
          },
          {
            "path": "stacontrast",
            "name": "站点对比分析",
            "icon": "fa fa-line-chart",
            "component": "_404"
          },
          {
            "path": "statistics",
            "name": "统计报表分析",
            "icon": "fa fa-table",
            "component": "_404"
          },
          {
            "path": "model",
            "name": "模式预报评估",
            "icon": "fa fa-pie-chart",
            "component": "_404"
          },
          {
            "path": "correct",
            "name": "预报效果评估",
            "icon": "fa fa-area-chart",
            "component": "_404"
          },
          {
            "path": "forecaster",
            "name": "预报员评估",
            "icon": "fa fa-bar-chart-o",
            "component": "_404"
          }
        ]
      },
      {
        "path": "/mng",
        "name": "管理",
        "icon": "icon-3clear-menu",
        "component": "Home",
        "redirect": "/mng/Workforce",
        "children": [
          {
            "path": "Workforce",
            "name": "排班管理",
            "icon": "fa fa-list-alt",
            "component": "_404"
          },
          {
            "path": "org",
            "name": "组织机构管理",
            "icon": "fa fa-user-secret",
            "component": "_404"
          },
          {
            "path": "role",
            "name": "角色管理",
            "icon": "fa fa-user-secret",
            "component": "_404"
          },
          {
            "path": "user",
            "name": "用户管理",
            "icon": "fa fa-users",
            "component": "_404"
          },
          {
            "path": "edit",
            "name": "用户设置",
            "icon": "fa fa-vcard",
            "component": "_404"
          }
        ]
      },
      {
        "path": "*",
        "hidden": true,
        "component": "_404"
      }
    ];
        
        parseRouter(routes);
        // debugger;
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