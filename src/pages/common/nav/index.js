require('./index.css');
var _user = require('service/user/index.js');
var _cart = require('service/cart/index.js');
var _util = require('util')
var nav = {
	init: function(){
		this.bindEvent();
		this.loadUsername();
		this.loadCartCount();
		return this;
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			// alert('sfa');
			_user.logout(function(result){
				window.location.reload();
			},function(message){
				_util.showErrorMsg(message)
			});
		})

	},
	loadUsername:function(){
		_user.getUsername(function(userInfo){
			// console.log(userInfo);
			$('.not-login').hide();
			$('.login')
			.show()
			.find('.username')
			.text(userInfo.username)
		})
	},
	loadCartCount:function(){
		_cart.getCartCount(function(count){
			// console.log("count:::",count)
			$('.nav-list .cart-num').text(count || 0);
		},function(msg){
			$('.nav-list .cart-num').text(0);
		})
	}
}

module.exports = nav.init();