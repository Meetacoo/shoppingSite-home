const _util = require('util/index');
const _user = {
	logout: function (success,error) {
		_util.request({
			url:'/user/logout',
			success:success,
			error:error
		})
	},
	login: function (data,success,error) {
		_util.request({
			method:'post',
			url:'/user/login',
			data:data,
			success:success,
			error:error
		})
	},
	register: function (data,success,error) {
		_util.request({
			method:'post',
			url:'/user/register',
			data:data,
			success:success,
			error:error
		})
	},
	getUsername: function (success,error) {
		_util.request({
			url:'/user/username',
			success:success,
			error:error
		})
	},
	getUserInfo: function (success,error) {
		_util.request({
			url:'/user/userInfo',
			success:success,
			error:error
		})
	},
	checkUsername:function(username,success,error){
		_util.request({
			url:'/user/checkUsername',
			data:{
				username:username
			},
			success:success,
			error:error
		})
	},
	updatePassword:function(data,success,error){
		_util.request({
			method:'put',
			url:'/user/updatePassword',
			data:data,
			success:success,
			error:error
		})
	}
}


module.exports = _user;
