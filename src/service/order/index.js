var _util = require('util/index');
var _order = {
	getOrderProductList: function (success,error) {
		_util.request({
			url:'/order/orderProductList',
			success:success,
			error:error
		})
	},
	createOrder: function (data,success,error) {
		_util.request({
			url:'/order',
			method:'post',
			data:data,
			success:success,
			error:error
		})
	}
}


module.exports = _order;