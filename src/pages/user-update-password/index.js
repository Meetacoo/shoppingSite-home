require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
var _side = require('pages/common/side');
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
var page = {
	init: function(){
		this.onLoad();
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
	onLoad:function(){
		_side.render('user-update-password');
	},
	submit:function(){
		// alert('sfa');
		// 1: 获取数据
		var formData = {
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val())
		}
		// console.log(formData)

		

		var validateResult = this.validate(formData);
		// 2: 验证成功
		if (validateResult.status) {
			formErr.hide();
			_user.updatePassword(formData,function(result){
				window.location.href = './result.html?type=updatePassword';
			},function(msg){
				formErr.show(msg);
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
		// 验证重复密码格式
		if (formData.repassword != formData.password) {
			result.msg = '密码不一致';
			return result;
		}
		result.status = true;
		return result;
	}
}

module.exports = page.init();