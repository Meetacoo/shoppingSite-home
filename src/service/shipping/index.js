var _util = require('util/index');
var _shipping = {
	
	getShippingList: function (data,success,error) {
		_util.request({
			url:'/cart',
			method:"post",
			data:data,
			success:success,
			error:error
		})
	}
}


module.exports = _shipping;
