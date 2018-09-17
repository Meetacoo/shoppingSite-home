require('pages/common/search');
require('pages/common/nav');
require('pages/common/footer');
require('util/pagination');
require('./index.css');


var _util = require('util');
var _shipping = require('service/shipping');
var _order = require('service/order');
var _modal = require('./modal.js');

var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')
var page = {
	data:{
		shippingId:null
	},
	init: function(){
		this.$shippingBox = $('.shipping-box');
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadShippingList();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this = this;

		// 新增地址
		this.$shippingBox.on('click','.shipping-add',function(){
			_modal.show({
				success:function(shippings){
					_this.renderShipping(shippings)
				} 
			});
		});

		// 删除地址
		this.$shippingBox.on('click','.shipping-delete',function(e){
			e.stopPropagation();
			// alert('remove')
			var $this = $(this)
			var shippingId = $this.parents('.shipping-item').data('shipping-id');
			if (_util.confirm('确定要删该地址吗')) {
				_shipping.delectShipping({shippingId:shippingId},function(shippings){
					_this.renderShipping(shippings);
				},function(msg){
					_util.showErrorMsg(msg);
				})
			}
		});

		// 编辑地址
		this.$shippingBox.on('click','.shipping-edit',function(e){
			e.stopPropagation();
			// alert('remove')
			var $this = $(this)
			var shippingId = $this.parents('.shipping-item').data('shipping-id');
			_shipping.getShipping({shippingId:shippingId},function(shipping){
				_modal.show({
					data:shipping,
					success:function(shipping){
						_this.renderShipping(shipping)
					}
				});
			},function(msg){
				_util.showErrorMsg(msg);
			})
		});
		/*this.$shippingBox.on('click','.shipping-edit',function(e){
			e.stopPropagation();
			// alert('remove')
			var $this = $(this)
			var shippingId = $this.parents('.shipping-item').data('shipping-id');
			_shipping.editShipping({shippingId:shippingId},function(shipping){
				_modal.show({
					data:shipping,
					success:function(shippings){
						_this.renderShipping(shippings)
					}
				});
			},function(msg){
				_util.showErrorMsg(msg);
			})
		});*/

		// 选择地址
		this.$shippingBox.on('click','.shipping-item',function(){
			var $this = $(this);
			$this.addClass('active');
			$this.siblings('.shipping-item').removeClass('active');
			_this.data.shippingId = $this.data('shipping-id');
		});

		// 确认支付
		$('.product-box').on('click','.btn-submit',function(){
			var $this = $(this);
			if (_this.data.shippingId) {
				_order.createOrder({shippingId:_this.data.shippingId},function(order){
					console.log(order);
					// window.location.href = './payment.html>orderNo='+order.orderNo;
				},function(msg){
					_util.showErrorMsg(msg)
				})
			} else {
				_util.showErrorMsg('请选择地址再提交')
			}
		});
		
	},
	loadShippingList:function(){
		var _this = this;
		_shipping.getShippingList(function(shippings){
			_this.renderShipping(shippings);
		},function(msg){
			_this.$shippingBox.html('<p class="empty-message">获取地址列表失败，请刷新重试</p>');
		})
		
	},
	renderShipping:function(shippings){
		var _this = this;		
		shippings.forEach(function(shipping){
			if (shipping._id == _this.data.shippingId) {
				shipping.isActive == true;
			}
		})
		var html = _util.render(shippingTpl,{
			shippings:shippings
		});
		this.$shippingBox.html(html);
	},
	loadProductList:function(){
		$('.product-box').html('<div class="loading"></div>')
		_order.getOrderProductList(function(result){
			// 购物车数据适配
			result.cartList.forEach(item=>{
				if (item.productInfo.images) {
					item.productInfo.image = item.productInfo.images.split(',')[0];
				} else {
					item.productInfo.image = require('images/product-default.jpg');
				}
			})
			result.notEmpty = !!result.cartList.length;
		
			var html = _util.render(productTpl,result);
			$('.product-box').html(html);
		},function(){
			// _util.showErrorMsg(msg)
			$('.product-box').html('<p class="empty-message">获取商品失败，请刷新重试</p>');
		})
		
	}
}

$(function(){
	page.init()
});