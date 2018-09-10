require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('./index.css');
require('util/pagination');


var _util = require('util');
var page = {
	init: function(){
		this.initPagination();
		this.bindEvent();
		this.loadProductList();
	},
	initPagination:function(){

	},
	bindEvent:function(){
		
	},
	loadProductList:function(){

	}
}

$(function(){
	page.init()
});