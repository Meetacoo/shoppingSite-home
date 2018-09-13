require('pages/common/logo');
require('pages/common/footer');
require('./index.css');

var _util = require('util');
var _user = require('service/user');

var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(msg){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text(msg)
	}
}
var login = {
	init: function(){
		this.bindEvent();
		return this;
	},
	bindEvent:function(){
		var _this = this;
		$('#submit-btn').on('click',function(){
			_this.submit();
		})
		$('input').on('keyup',function(e){
			if (e.keyCode == 13) {
				_this.submit();
			}
		})
	},
	submit:function(){
		// alert('sfa');
		// 1: 获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
		}
		// console.log(formData)
		var validateResult = this.validate(formData);
		// 2: 验证成功
		if (validateResult.status) {
			formErr.hide();
			_user.login(formData,function(result){
				_util.goHome();
				window.location.href=_util.getParamFromUrl('redirect');
			},function(msg){
				formErr.show(validateResult.msg);
			})
		} 
		// 3: 验证失败
		else {
			formErr.show(validateResult.msg);
		}
	},
	validate:function(formData){
		var result = {
			status:false,
			msg:''
		}
		// 验证用户名不能为空
		if (!_util.validate(formData.username,'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		// 验证用户名格式
		if (!_util.validate(formData.username,'username')) {
			result.msg = '用户名格式错误';
			return result;
		}
		// 验证密码不能为空
		if (!_util.validate(formData.password,'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		// 验证密码格式
		if (!_util.validate(formData.password,'password')) {
			result.msg = '密码格式错误';
			return result;
		}

		result.status = true;
		return result;
	}
}

$(function(){
	login.init();
})