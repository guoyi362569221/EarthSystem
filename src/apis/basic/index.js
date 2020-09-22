const SERVER_API_PATH = '/monitor_webapi/';

export default [
	{
		name: '首页--历史和今日数据条目统计',
		method: 'SbCount',
		path: SERVER_API_PATH + 'statistics/sbCount',
		type: 'get',
	}, {
		name: '首页--历史和今日数据条目统计',
		method: 'DataCount',
		path: SERVER_API_PATH + 'statistics/dataCount',
		type: 'get',
	}, {
		name: '首页--状态数量统计',
		method: 'StatusCount',
		path: SERVER_API_PATH + 'statistics/statusCount',
		type: 'get',
	}, {
		name: '首页--设备类型数量统计',
		method: 'SbTypeCountStatistic',
		path: SERVER_API_PATH + 'statistics/sbTypeCountStatistic',
		type: 'get',
	}, {
		name: '首页--地图展示mark',
		method: 'DeviceList',
		path: SERVER_API_PATH + 'statistics/deviceList',
		type: 'get',
	}
]