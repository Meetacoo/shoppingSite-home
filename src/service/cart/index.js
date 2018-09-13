var _util = require('util/index');
var _cart = {
	
	addCart: function (data,success,error) {
		_util.request({
			method:'post',
			url:'/cart',
			data:data,
			success:success,
			error:error
		})
	},
	getCart: function (success,error) {
		_util.request({
			url:'/cart',
			success:success,
			error:error
		})
	},
	getCartCount: function (success,error) {
		_util.request({
			url:'/cart/count',
			success:success,
			error:error
		})
	},

	selectOne: function (data,success,error) {
		_util.request({
			method:'put',
			url:'/cart/selectOne',
			data:data,
			success:success,
			error:error
		})
	},
	unselectOne: function (data,success,error) {
		_util.request({
			method:'put',
			url:'/cart/unselectOne',
			data:data,
			success:success,
			error:error
		})
	},
	selectAll: function (success,error) {
		_util.request({
			method:'put',
			url:'/cart/selectAll',
			success:success,
			error:error
		})
	},
	unselectAll: function (success,error) {
		_util.request({
			method:'put',
			url:'/cart/unselectAll',
			success:success,
			error:error
		})
	},
	delectOne: function (data,success,error) {
		_util.request({
			method:'put',
			url:'/cart/delectOne',
			data:data,
			success:success,
			error:error
		})
	},
	delectSelected: function (success,error) {
		_util.request({
			method:'put',
			url:'/cart/delectSelected',
			success:success,
			error:error
		})
	},
	updateCount: function (data,success,error) {
		_util.request({
			method:'put',
			url:'/cart/updateCount',
			data:data,
			success:success,
			error:error
		})
	}
}


module.exports = _cart;
