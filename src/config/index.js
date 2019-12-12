

let gbs = {

	access:true,

	db_prefix: 'gs_es_', //本地存储的key

	//状态码字段
	api_status_key_field: 'status',
	//状态码value
	api_status_value_field: 200,

	api_data_field: 'data',

	api_custom_status_key_field: 'StatusCode',

	api_custom_status_value_field: 200,

	api_custom_data_field: 'HttpContent',

	api_custom_status_message:'HttpRequestMessage',

	api_custom: {
		404: function (res) {
			this.$alert(res.status + ',' + res.msg + '！', '未找到接口错误', {
				confirmButtonText: '确定',
				callback: action => {
					this.$router.push('/login');
				}
			});
		},
		401: function (res) {
			this.$store.dispatch('remove_userinfo').then(() => {
				this.$alert(res.status + ',' + res.msg + '！', '授权错误', {
					confirmButtonText: '确定',
					callback: action => {
						this.$router.push('/login');
					}
				});
			});
		}
	}
};

let cbs = {
	/**
	 * ajax请求成功，返回的状态码不是200时调用
	 * @param  {object} err 返回的对象，包含错误码和错误信息
	 */
	statusError(err) {
		console.log('err');
		if (err.status !== 401) {
			this.$message({
				showClose: true,
				message: '返回错误：' + err.msg,
				type: 'error'
			});
		} else {
			this.$store.dispatch('remove_userinfo').then(() => {
				this.$alert(err.status + ',' + err.msg + '！', '授权错误', {
					confirmButtonText: '确定',
					callback: action => {
						this.$router.push('/login');
					}
				});
			});
		}
	},

	/**
	 * ajax请求网络出错时调用
	 */
	requestError(err) {
		this.$message({
			showClose: true,
			message: '发生错误：' + (err.response ? err.response.status+',' : '') + (err.response ? err.response.statusText : err),
			type: 'error'
		});
	}
};
export {
	gbs,
	cbs
};
