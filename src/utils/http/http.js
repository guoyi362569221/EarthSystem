import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {serverUrl} from '../../config/index'

Vue.use(VueAxios, axios);

// 动态设置本地和线上接口域名
axios.defaults.timeout = 60000
axios.defaults.baseURL = serverUrl
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {Function} sucFn        回调函数
 * @param  {boolean} isLoading 是否显示加载状态
 */
export function request({
    type,
    url,
    data,
    sucFn,
    errFn,
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
        if (isLoading) {
            this.$store.dispatch('show_loading');
        }
        const axiosRequest = async () => {
            try {
                const res = await Vue.axios(options);
                this.$store.dispatch('hide_loading');
                let data = [];
                if (res['status'] === 200) {
                    data = res.data;
                    if (data['HttpContent'] !== undefined) {
                        if (data['StatusCode'] === 200) {
                            data = data['HttpContent'];
                            sucFn(data);
                        } else {
                            this.$alert(data['HttpRequestMessage'], '提示', {
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
                    this.$message({
                        showClose: true,
                        message: '返回错误：' + data['HttpRequestMessage'],
                        type: 'error'
                    });
                }
            } catch (err) {
                if (errFn) {
                    errFn.call(this, []);
                }
                this.$store.dispatch('hide_loading');
                this.$message({
                    showClose: true,
                    message: '发生错误：' + (err.response ? err.response.status + ',' : '') + (err.response ? err.response.statusText : err),
                    type: 'error'
                });
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
            if (res.length > 0 && res[0].data['HttpContent']) {
                res.forEach((item) => {
                    if (item.data['StatusCode'] === 200) {
                        item.data = item.data['HttpContent'];
                    } else {
                        this.$alert(item.data['HttpRequestMessage'], '提示', {
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
            else {
                sucFn(res);
            }
        } catch (err) {
            this.$store.dispatch('hide_loading');
            if (errFn) {
                errFn.call(this, []);
            }
            this.$message({
                showClose: true,
                message: '发生错误：' + (err.response ? err.response.status + ',' : '') + (err.response ? err.response.statusText : err),
                type: 'error'
            });
        }
    };
    axiosAllRequest();
}
