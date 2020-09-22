import https from '../utils/http/index';
import request from '../apis/index';


let plugins = {};

for (var i = 0; i < request.length; i++) {
	if (typeof request[i] === 'object' && request[i].list && Array.isArray(request[i].list)) {
		for (var j = 0; j < request[i].list.length; j++) {
			plugins[request[i].list[j].method] = (function (n, m) {
				return function ({type = request[n].list[m].type, path = request[n].list[m].path, data, fn, errFn, tokenFlag=false,showLoading=true, headers, opts} = {}) {
					console.log(https)
					console.log(request)
					return https.request.call(this, {
						type,
						path,
						data,
						fn,
						errFn,
						tokenFlag,
						showLoading,
						headers,
						opts
					});


				};
			})(i, j);

		}
	}
}

plugins['promiseAll'] = function (promises, sucFn, errFn) {
	return https.all.call(this, promises, sucFn, errFn);
};

export default plugins;
