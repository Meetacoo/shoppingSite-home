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
		if (this.params.productId) {
			this.loadProductDetail();
		}
	},
	bindEvent:function(){
		var _this = this;
		$('.detail-box').on('mouseenter','.product-small-img-item',function(){
			var $this = $(this);
			$this
			.addClass('active')
			.siblings('.product-small-img-item')
			.removeClass('active');
			var imgSrc = $this.find('img').attr('src');
			$('.product-main-img img').attr('src',imgSrc);
		})
		$('.detail-box').on('click','.btn-count',function(){
			var $this = $(this);
			var $input = $('.count-input');
			var min = 1;
			var current = $input.val();
			var stock = _this.stock;
			if ($this.hasClass('plus')) {
				$input.val(current < stock ?  current - 0 + 1 : stock);
			}
			else if ($this.hasClass('minus')) {
				$input.val(current > min ? current - 1 : min);
			}
			if (current == stock || current == min) {
				return
			} 
		})
		$('.detail-box').on('click','.add-cart',function(){
			_cart.addCart({
				productId:_this.params.productId,
				count:$('.count-input').val()
			},function(data){
				window.location.href = './result.html?type=add';
			},function(msg){
				_util.showErrorMsg(msg);
			})
		})
	},
	loadProductDetail:function(){
		var _this = this;
		$('.detail-box').html('<div class="loading"></div>')
		
		_product.getProductDetail({productId:this.params.productId},function(product){
			if (product) {
				// console.log('product:::',product)
				/*if (product.images) {
					product.images = product.images.split(',');
				} else {
					product.images = [require('images/product-default.jpg')]
				}*/
				product.images = product.images.split(',');
				product.mainImg = product.images[0];
				_this.stock = product.stock;

				var html = _util.render(tpl,product);
				$('.detail-box').html(html);
			} else {
				$('.detail-box').html('<p class="empty-message">异常</p>')
			}
			
		},function(msg){
			_util.showErrorMsg(msg);
		})
	}
}

$(function(){
	page.init()
});