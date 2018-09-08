require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('./index.css')


var _util = require('util');
var page = {
	listParams:{
		keyword:_util.getParamFromUrl('keyword') || '',
		categoryId:_util.getParamFromUrl('categoryId') || '',
		page:_util.getParamFromUrl('page') || 1,
		orderBy:_util.getParamFromUrl('orderBy') || "default"
	},
	init: function(){
		this.bindEvent();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this = this;
		$('.sort-item').on('click',function(){
			// console.log(this)
			var $this = $(this);
			if ($this.hasClass('active')) {
				return
				// if (true) {}
			}
			else{
				$this
				.addClass('active')
				.siblings()
				.removeClass('active')
			}
			_this.loadProductList();
		})
		
	},
	loadProductList:function(){
		this.listParams.categoryId
		? (delete this.listParams.keyword)
		: (delete this.listParams.categoryId)
		console.log(this.listParams)
	}
}

$(function(){
	page.init()
});