// require('./index.css');
const _util = require('util/index');
const _user = {
	logout: function (success,error) {
		_util.request({
			url:'/user/layout',
			success:success,
			error:error
		})
	}
}


module.exports = _user;
