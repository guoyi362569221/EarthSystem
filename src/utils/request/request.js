/**
 * Create by 郭大力 2019年12月9日13:54:34
 * Http请求封装类
 */

import Vue form 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import axios from 'axios';
import {dateUtils} from 'utils/dateUtils.js'
import {gbs,cbs} from 'config/requestConfig.js';

Vue.use(VueAxios, axios);


/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {Function} sucFn        回调函数
 * @param  {boolean}   isRequireToken 是否需要携带token参数，为true，需要；false，不需要。一般除了登录，都需要
 * @param  {boolean} isLoading 是否显示加载状态
 */
export function request({
                            type,
                            url,
                            data,
                            sucFn,
                            errFn,
                            requireToken,
                            isLoading,
                            headers,
                            opts
                        } = {}) {

    let options = {
        method: type,
        url: url,
        headers: headers && typeof headers === 'object' ? headers : {}
    };

    options[type === 'get' ? 'params' : 'data'] = data;
    if (requireToken === true) {
        if (!this.$store.state.user.userinfo.token) {//判断token是否存在或过期
            this.$alert('用户未登录！', '错误', {
                confirmButtonText: '确定',
                type: 'error'
            });
            this.$router.push('/login');
            return {};
        } else if (this.$store.state.user.userinfo.token['.expires']) {
            let expiresData = dateUtils.strToDate(this.$store.state.user.userinfo.token['.expires']);
            let diff = dateUtils.dateDiff('s', new Date(), expiresData);
            if (diff > 0)
                options.headers['Authorization'] = this.$store.state.user.userinfo.token.token_type + ' ' + this.$store.state.user.userinfo.token.access_token;
            else {
                this.$router.push('/login');
                return {};
            }
        }
        else {
            this.$router.push('/login');
            return {};
        }
    }

    //axios内置属性均可写在这里
    if (opts && typeof opts === 'object') {
        for (let f in opts) {
            options[f] = opts[f];
        }
    }
    if (!sucFn) {
        return Vue.axios(options);
    }
    else {
        // 分发显示加载样式任务
        if(isLoading){
            this.$store.dispatch('show_loading');
        }
        const axiosRequest = async () => {
            try {
                const res = await Vue.axios(options);
                this.$store.dispatch('hide_loading');
                let data = [];
                if (res[gbs.api_status_key_field] === gbs.api_status_value_field) {
                    if (gbs.api_data_field) {
                        data = res[gbs.api_data_field];
                    } else {
                        data = res.data;
                    }
                    if (data[gbs.api_custom_data_field] !== undefined) {
                        if (data[gbs.api_custom_status_key_field] === gbs.api_custom_status_value_field) {
                            data = data[gbs.api_custom_data_field];
                            sucFn(data);
                        } else {
                            this.$alert(data[gbs.api_custom_status_message], '提示', {
                                confirmButtonText: '确定',
                                type: 'warning'
                            });
                            if (errFn) {
                                errFn.call(this, data);
                            }
                        }
                    }
                    else {
                        sucFn(data);
                    }
                } else {
                    this.$store.dispatch('hide_loading');
                    if (gbs.api_custom[res[gbs.api_status_key_field]]) {
                        gbs.api_custom[res[gbs.api_status_key_field]].call(this, res);
                    } else {
                        if (errFn) {
                            errFn.call(this, res.data);
                        } else {
                            cbs.statusError.call(this, res.data);
                        }
                    }
                }
            } catch (err) {
                if (errFn){
                    errFn.call(this, []);
                }
                this.$store.dispatch('hide_loading');
                cbs.requestError.call(this, err);
            }
        };
        axiosRequest();
    }
    
}

export function all(promises, sucFn, errFn) {
    this.$store.dispatch('show_loading');
    const axiosAllRequest = async () => {
        try {
            const res = await Vue.axios.all(promises);
            this.$store.dispatch('hide_loading');
            if (res.length > 0 && res[0].data[gbs.api_custom_data_field]) {
                res.forEach((item) => {
                    if (item.data[gbs.api_custom_status_key_field] === gbs.api_custom_status_value_field) {
                        item.data = item.data[gbs.api_custom_data_field];
                    } else {
                        this.$alert(item.data[gbs.api_custom_status_message], '提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        });

                        if (errFn) {
                            errFn.call(this, []);
                        }
                    }
                });
                sucFn(res);
            }
            else
                sucFn(res);

        } catch (err) {
            this.$store.dispatch('hide_loading');
            if (errFn)
                errFn.call(this, []);
            cbs.requestError.call(this, err);
        }
    };
    axiosAllRequest();
}
