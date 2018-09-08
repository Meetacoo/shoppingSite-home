require('pages/common/nav');
require('pages/common/logo');
require('pages/common/search');
require('pages/common/footer');
require('./index.css')
// $('body').html('indexkekgjri');
/*// 使用额外配置文件后引用 jQuery
var $$ = require('jquery');
$$('body').html('index');*/

var _util = require('util');
var unslider = require('util/carousel/');

var tpl = require('./index.tpl');
var carouselTpl = require('./carousel.tpl');
var floorTpl = require('./floor.tpl');

var page = {
	// :[{:[{:},{:}]},]
	keywords:[
		{item:[{name:'手机'},{name:'IPhone'}]},
		{item:[{name:'女装'},{name:'漂亮'}]},
		{item:[{name:'手机'},{name:'IPhone'}]},
		{item:[{name:'手机'},{name:'IPhone'}]},
		{item:[{name:'手机'},{name:'IPhone'}]},
		{item:[{name:'手机'},{name:'IPhone'}]},
		{item:[{name:'女装'},{name:'漂亮'}]},
		{item:[{name:'手机'},{name:'IPhone'}]},
		{item:[{name:'手机'},{name:'IPhone'}]},
		{item:[{name:'手机'},{name:'IPhone'}]}
	],
	carousel:[
		{categoryId:'1',image:require('images/carousel/carousel1.jpg')},
		{categoryId:'2',image:require('images/carousel/carousel2.jpg')},
		{categoryId:'3',image:require('images/carousel/carousel3.jpg')},
	],
	floor:[
		{
			title:'F1 数码',
			item:[
				{categoryId:"Huawei",text:"华为",image:require('images/floor/floor01/floor01-01.jpg')},
				{categoryId:"mi",text:"小米",image:require('images/floor/floor01/floor01-02.jpg')},
				{categoryId:"Vivo",text:"Vivo",image:require('images/floor/floor01/floor01-03.jpg')},
				{categoryId:"OPPO",text:"OPPO",image:require('images/floor/floor01/floor01-04.jpg')},
				{categoryId:"iPhone",text:"iPhone",image:require('images/floor/floor01/floor01-05.jpg')}
			]
		},
		{
			title:'F2 服饰',
			item:[
				{categoryId:"手表",text:"手表",image:require('images/floor/floor02/floor02-01.jpg')},
				{categoryId:"帅哥",text:"帅哥",image:require('images/floor/floor02/floor02-02.jpg')},
				{categoryId:"外套",text:"外套",image:require('images/floor/floor02/floor02-03.jpg')},
				{categoryId:"鞋子",text:"鞋子",image:require('images/floor/floor02/floor02-04.jpg')},
				{categoryId:"夹克",text:"夹克",image:require('images/floor/floor02/floor02-05.jpg')}
			]
		},
		{
			title:'F3 家装',
			item:[
				{categoryId:"榨汁机",text:"榨汁机",image:require('images/floor/floor03/floor03-01.jpg')},
				{categoryId:"电饭煲",text:"电饭煲",image:require('images/floor/floor03/floor03-02.jpg')},
				{categoryId:"音响",text:"音响",image:require('images/floor/floor03/floor03-03.jpg')},
				{categoryId:"床上用品",text:"床上用品",image:require('images/floor/floor03/floor03-04.jpg')},
				{categoryId:"流理台",text:"流理台",image:require('images/floor/floor03/floor03-05.jpg')}
			]
		}
	],
	init: function(){
		this.loadKeywords();
		this.loadCarousels();
		this.loadFloors();
	},
	loadKeywords:function(){
		var html = _util.render(tpl,{
			keywords:this.keywords
		});
		$('.keywords').html(html);
	},
	loadCarousels:function(){
		var html = _util.render(carouselTpl,{
			carousel:this.carousel
		});
		$('.carousel').html(html);

		var $carousel = $('.carousel').unslider({
			dots:true,
			keys: true
		});
		$('.arrow').on('click',function(){
			var direction = $(this).hasClass('next') ? 'next' : 'prev';
			$carousel.data('unslider')[direction]();
		})
		// $('.carousel').unslider();
	},
	loadFloors:function(){
		var html = _util.render(floorTpl,{
			floor:this.floor
		});
		$('.floor-wrap').html(html);
		// $('.carousel').unslider();
	}
}
$(function(){
	page.init()
});