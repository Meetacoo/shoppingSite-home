require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('util/pagination');
require('./index.css');


var _util = require('util');
var _product = require('service/product');
var _cart = require('service/cart');

var tpl = require('./index.tpl')
var page = {
	params:{
		productId:_util.getParamFromUrl('productId') || '',
	},
	init: function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadCart();
	},
	bindEvent:function(){
		var _this = this;
		$('.cart-box').on('click','.select-one',function(){
			var $this = $(this);
			let productId = $this.parents('.cart-item').data('product-id')
			//选中
			if($this.is(':checked')){
				// alert('checked')
				_cart.selectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
			//取消
			else{
				// alert('wr')
				_cart.unselectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})				
			}
		})
	},
	loadCart:function(){
		var _this = this;
		_cart.getCart(function(cart){
			_this.renderCart(cart)
		},function(msg){
			_util.showErrorMsg(msg)
		})
	},
	renderCart:function(cart){
		cart.cartList.forEach(item=>{
			if (item.productInfo.images) {
				// item.product.image = item.product.images.split(',')[0];
				item.productInfo.image = item.productInfo.images.split(',')[0];
			} else {
				item.productInfo.image = require('images/product-default.jpg');
			}
		})
		cart.notEmpty = !!cart.cartList.length;
		var html = _util.render(tpl,cart)
		$('.cart-box').html(html);
	}
}

$(function(){
	page.init()
});