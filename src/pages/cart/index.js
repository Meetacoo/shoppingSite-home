require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('util/pagination');
require('./index.css');


var _util = require('util');
var _product = require('service/product');
var _cart = require('service/cart');
var _nav = require('pages/common/nav');

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
		//  单个选中/取消
		$('.cart-box').on('click','.select-one',function(){
			var $this = $(this);
			let productId = $this.parents('.product-item').data('product-id')
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
		});
		//  单个选中/取消
		$('.cart-box').on('click','.select-all',function(){
			var $this = $(this);
			//选中
			if($this.is(':checked')){
				// alert('checked')
				_cart.selectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
			//取消
			else{
				// alert('wr')
				_cart.unselectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})				
			}
		});
		//  删除单个/取消
		$('.cart-box').on('click','.delete-one',function(){
			var $this = $(this);
			let productId = $this.parents('.product-item').data('product-id');
			//选中

			if(_util.confirm('确定删除这条购物车信息吗？')){
				_cart.delectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				});
			}
		});
		//  删除所有选中/取消
		$('.cart-box').on('click','.delete-selected',function(){
			var $this = $(this);
			//选中
			if(_util.confirm('确定删除所有选中的购物车信息吗？')){
				// alert('checked')
				_cart.delectSelected(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
		});
		// count
		$('.cart-box').on('click','.count-btn',function(){
			var $this = $(this);
			let productId = $this.parents('.product-item').data('product-id');
			var $input = $this.siblings('.count-input');
			var min = 1;
			var current = parseInt($input.val());
			var stock = $input.data('stock');
			var newCount = 0;
			if ($this.hasClass('plus')) {
				if (current >= stock) {
					_util.showErrorMsg('库存数量已达上限');
					return
				}
				newCount = current / 1 + 1;
			}
			else if ($this.hasClass('minus')) {
				if (current <= min) {
					_util.showErrorMsg('最少数量为1呢呵呵呵呵');
					return
				}
				newCount = current - 1;
			}
			_cart.updateCount({productId:productId,count:newCount},function(cart){
				_this.renderCart(cart)
				// console.log("cart:::",cart)
			},function(msg){
				_util.showErrorMsg(msg)
			})
		});
		// 订单支付结算
		$('.cart-box').on('click','.btn-submit',function(){
			if (_this.cart && _this.cart.totalCartPrice > 0) {
				window.location.href = './order-confirm.html'
			} else {
				_util.showErrorMsg('请选择商品后再提交')
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
		_nav.loadCartCount();
		// 缓存购物车信息，用于提交时验证
		this.cart = cart;
		// 购物车数据适配
		cart.cartList.forEach(item=>{
			// console.log(item.productInfo.stock)
			if (item.productInfo.images) {
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