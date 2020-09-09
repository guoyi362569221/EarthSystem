import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';

import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
// import 'babel-polyfill';

import $_jQuery from 'jquery';
import store from './store';
import less from 'less'

Vue.use(less)
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    zh: 'zh'
});

Vue.config.productionTip = false;

Vue.prototype['$_jQuery'] = $_jQuery;

//  添加全局处理窗口大小变更方法
Vue.prototype['$$onResize'] = function (callFun) {
	this.$jQuery(window).resize(() => {
		if (this._statue !== 'CLOSE') {
			callFun.call(this);
		}
	});
	this.$root.eventBus.$on('toggleMenu', () => {
		if (this._statue !== 'CLOSE') {
			callFun.call(this);
		}
	});
};


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
		data(){
			return {
				eventBus: new Vue()
			}
		},
		router,
		store,
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

