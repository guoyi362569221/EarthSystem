import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
// import 'babel-polyfill';


Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    zh: 'zh'
});

Vue.config.productionTip = false;


router.routerAsyncFun(function(router) {
	// let vueApp = new Vue({
	// 	el: '#app',
	// 	router,
	// 	// store,
	// 	i18n,
	// 	template: '<App/>',
	// 	components: {
	// 		App
	// 	}
	// });
	debugger;
	new Vue({
	    router,
	    i18n,
	    render: h => h(App)
	}).$mount('#app');

	//使用钩子函数对路由进行权限跳转
	router.beforeEach((to, from, next) => {

		//NProgress.start();
		next();
	});

	// router.afterEach(transition => {
	// 	//NProgress.done();
	// });
});

