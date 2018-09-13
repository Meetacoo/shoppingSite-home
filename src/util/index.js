var Hogan = require('hogan.js');
const _util = {
	request:function(params){
		var _this = this;
		$.ajax({
			url:params.url || '',
			method:params.method || 'get',
			dataType:params.dataType ||'json',
			data:params.data || '',
			success:function(result){
				if (result.code === 0) {
					params.success && params.success(result.data)
				} else if(result.code === 10) {
					_this.doLogin();
				} else if(result.code === 1) {
					params.error && params.error(result.message)
				}
			},
			error:function(err){
				params.error && params.error(err.statusText)
			}
		})
	},
	showErrorMsg:function(msg){
		alert(msg);
	},
	goHome:function(){
		window.location.href='/';
	},
	getParamFromUrl:function(key){
		// console.log(window.location.search.substr(1))
		var query = window.location.search.substr(1);
		var reg = new RegExp('(^|&)'+key+'=([^&]*)(&|$)');
		var result = query.match(reg);
		return result ? decodeURIComponent(result[2]) : null;
		// console.log(result);
	},
	doLogin:function(){
		window.location.href='./user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	render:function(tpl,data){
		var template = Hogan.compile(tpl);
		var html = template.render(data);
		return html;
	},
	validate:function(value,type){
		var value = $.trim(value);
		// 非空验证
		if (type === 'require') {
			return !!value;
		}
		// 用户名格式验证
		if (type === 'username') {
			return /^[a-zA-Z0-9_]{3,10}/.test(value);
		}
		// 用户名密码格式验证
		if (type === 'password') {
			return /^[a-zA-Z0-9_]{3,10}/.test(value);
		}
		// 用户重复密码格式验证
		if (type === 'repassword') {
			return /^[a-zA-Z0-9_]{3,10}/.test(value);
		}
		// 用户手机格式验证
		if (type === 'phone') {
			return /^[1][3,4,5,7,8][0-9]{9}$/.test(value);
		}
		// 邮箱格式验证
		if (type === 'email') {
			return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value);
		}

	},
	confirm:function(msg){
		return window.confirm(msg);
	}
}


module.exports = _util;