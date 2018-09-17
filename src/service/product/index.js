var _util = require('util/index');
var _product = {
	
	getProductList: function (data,success,error) {
		_util.request({
			url:'/product/home/list',
			data:data,
			success:success,
			error:error
		})
	},
	getProductDetail: function (data,success,error) {
		_util.request({
			url:'/product/home/detail',
			data:data,
			success:success,
			error:error
		})
	}
}


module.exports = _product;

