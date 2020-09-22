import Vue from 'vue';
import _ from 'underscore';
import $_jQuery from 'jquery';
import plugins from './plugin';


/**
 * 把一些全局对象和一些全局方法，注册到Vue原型上
 */

let GlobePlugin = {};
GlobePlugin.install = function (Vue) {
    //注册全局方法，如常用的接口方法，工具方法等。
    _.each(plugins, (item, key) => {
        Vue.prototype['$$' + key] = item;
    });

    //  添加全局处理窗口大小变更方法
    Vue.prototype['$$onResize'] = function (callFun) {
        $_jQuery(window).resize(() => {
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
};

Vue.use(GlobePlugin);
