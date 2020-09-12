import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import global from './global/';
import leftmenu from './leftmenu/';
import router from './router/';
import breadcrumb from './breadcrumb/'
export default new Vuex.Store({
    modules: {
		global,
		router,
		leftmenu,
		breadcrumb,
    }
});
