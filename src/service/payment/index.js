var _util = require('util/index');
var _order = {
	getPaymentInfo: function (data,success,error) {
		_util.request({
			url:'/payment/info',
			data:data,
			success:success,
			error:error
		})
	},
	getPaymentStatus: function (data,success,error) {
		_util.request({
			url:'/payment/status',
			data:data,
			success:success,
			error:error
		})
	}
}


module.exports = _order;