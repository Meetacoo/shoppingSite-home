require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('./index.css');
require('util/pagination');


var _util = require('util');
var tpl = require('./index.tpl');
var _product = require('service/product');
var page = {
	listParams:{
		keyword:_util.getParamFromUrl('keyword') || '',
		categoryId:_util.getParamFromUrl('categoryId') || '',
		page:_util.getParamFromUrl('page') || 1,
		orderBy:_util.getParamFromUrl('orderBy') || "default"
	},
	init: function(){
		this.initPagination();
		this.bindEvent();
		this.loadProductList();
	},
	initPagination:function(){
		var _this = this;
		var $pagination = $('.pagination-box');
		$pagination.on('page-change',function(e,value){
			// console.log(value)
			_this.listParams.page = value;
			_this.loadProductList()
		})
		$pagination.pagination();
	},
	bindEvent:function(){
		var _this = this;
		$('.sort-item').on('click',function(){
			// console.log(this)
			var $this = $(this);
			// 如果点击的是默认排序
			if ($this.hasClass('default')) {
				if ($this.hasClass('active')) {
					return
				}
				$this
				.addClass('active')
				.siblings('.sort-item')
				.removeClass('active')
				_this.listParams.orderBy = 'default';
			}
			// 如果点击的是按价格排序
			else if ($this.hasClass('price')) {
				$this
				.addClass('active')
				.siblings('.sort-item')
				.removeClass('active');
				if (!$this.hasClass('asc')) {
					$this
					.addClass('asc')
					.removeClass('desc');
					_this.listParams.orderBy = 'price_asc';
				} else {
					$this
					.addClass('desc')
					.removeClass('asc');
					_this.listParams.orderBy = 'price_desc';
				}
			}
			_this.listParams.page = 1;
			_this.loadProductList();
		})
		
	},
	loadProductList:function(){
		this.listParams.categoryId
		? (delete this.listParams.keyword)
		: (delete this.listParams.categoryId)
		// console.log(this.listParams)
		// $('.product-list-box').html('<p>loading...</p>');
		$('.product-list-box').html('<div class="loading"></div>')
		_product.getProductList(this.listParams,function(result){
			console.log("result:::",result)
			var list = result.list.map(function(product){
				console.log(product.images)
				/*if (product.images) {
					// console.log(product.images)
					// console.log(product.images.split(','));
					product.image = product.images.split(',')[0];
				} else {
					product.image = require('images/product-default.jpg');
				}*/
				product.image = product.images.split(',')[0];
				return product;
			});
			var html = _util.render(tpl,{
				list:list
			});
			$('.product-list-box').html(html);
			$('.pagination-box').pagination('render',{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize
			})
		},function(msg){
			_util.showErrorMsg(msg)
		})
	}
}

$(function(){
	page.init()
});