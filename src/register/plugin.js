import https from '../utils/http/index';
import request from '../apis/index';


let plugins = {};

for (var i = 0; i < request.length; i++) {
	if (typeof request[i] === 'object' && request[i].list && Array.isArray(request[i].list)) {
		for (var j = 0; j < request[i].list.length; j++) {
			plugins[request[i].list[j].method] = (function (n, m) {
				return function ({ type = request[n].list[m].type, path = request[n].list[m].path, data, fn, errFn, showLoading = true, headers, opts } = {}) {
					return https.request.call(this, {
						type: type,
						url: path,
						data: data,
						sucFn: fn,
						errFn: errFn,
						isLoading: showLoading,
						headers: headers,
						opts: opts
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
