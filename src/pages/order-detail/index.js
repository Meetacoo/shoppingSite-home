require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('./index.css');

var _util = require('util');
var _order = require('service/order');
var _side = require('pages/common/side');

var tpl = require('./index.tpl');
var page = {
	params:{
		orderNo:_util.getParamFromUrl('orderNo') || 1,
	},
	init: function(){
		this.onLoad();
		this.loadOrder();
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		$('.order-detail').on('click','.cancel-order-btn',function(){
			// alert('asfd')
			if (_util.confirm("确定要取消支付吗？")) {
				_order.cancelOrder({orderNo:_this.params.orderNo},function(order){
					// console.log(order)
					_this.renderOrderDetail(order);
				},function(msg){
					_util.showErrorMsg(msg);
				})
			}
		})
	},
	onLoad:function(){
		_side.render('order-list');
	},
	loadOrder:function(){
		var _this = this;
		_order.getOrder(_this.params,function(order){
			_this.renderOrderDetail(order)
		},function(msg){
			$('.side-content').html('<p class="empty-message">获取订单失败</p>')
		})
	},
	renderOrderDetail:function(order){
		if (order) {
			order.productList.forEach(product=>{
				// console.log(product)
				if (product.images) {
					product.image = product.images.split(',')[0];
				} else {
					product.image = require('images/product-default.jpg');
				}
			})
			order.createdTime = new Date(order.createdAt).toLocaleString();
		}
		
		var html = _util.render(tpl,{
			order:order,
			notEmpty:!!order,
			needPay:order.status == 10,
			canCancel:order.status == 10
		});
		$('.side-content').html(html);
		// console.log(order)
	}
}

$(function(){
	page.init()
});