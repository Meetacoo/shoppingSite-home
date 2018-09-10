require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('util/pagination');
require('./index.css');


var _util = require('util');
var _product = require('service/product');
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
		if (this.params.productId) {
			this.loadProductDetail();
		}
	},
	bindEvent:function(){
		var _this = this;
	},
	loadProductDetail:function(){
		_product.getProductDetail({productId:this.params.productId},function(product){
			// console.log(product);
			if (product.images) {
				product.images = product.images.split(',');
			} else {
				product.images = [require('images/product-default.jpg')]
			}
			product.mainImg = product.images[0];

			var html = _util.render(tpl,product);
			$('.detail-box').html(html);
		},function(msg){
			_util.showErrorMsg(msg);
		})
	}
}

$(function(){
	page.init()
});