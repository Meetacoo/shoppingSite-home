require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('./index.css');

var _util = require('util');
var _payment = require('service/payment');

var tpl = require('./index.tpl');
var page = {
	params:{
		orderNo:_util.getParamFromUrl('orderNo') || 1,
	},
	init: function(){
		this.onLoad();
	},
	onLoad:function(){
		if (this.params.orderNo) {
			this.loadPaymentDetail();
		}
	},
	loadPaymentDetail:function(){
		var _this = this;
		$('.payment-box').html('<div class="loading"></div>')
		_payment.getPaymentInfo({orderNo:this.params.orderNo},function(payment){
			var html = _util.render(tpl,payment);
			$('.payment-box').html(html);
			_this.listenPaymenStatus();
		},function(msg){
			// _util.showErrorMsg(msg);
			$('.payment-box').html('<p class="empty-message">获取支付信息出错了，请刷新重试</p>')
		})
	},
	listenPaymenStatus: function(){
		var _this = this;
		window.setInterval(function(){
			_payment.getPaymentStatus({orderNo:_this.params.orderNo},function(result){
				if (result == true) {
					window.location.href = "./result.html?type=payment&orderNo="+_this.params.orderNo;
				}
			})
		},5000)
	}
}

$(function(){
	page.init()
});