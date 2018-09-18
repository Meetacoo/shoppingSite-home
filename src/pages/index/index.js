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
		{item:[{name:'手机'},{name:'phone'}]},
		{item:[{name:'电子书刊'},{name:'电子书 网络原创'}]},
		{item:[{name:'音像'},{name:'音乐 影视'}]},
		{item:[{name:'少儿'},{name:'商务 投资'}]},
		{item:[{name:'文艺'},{name:'小说 文学'}]},
		{item:[{name:'人文社科'},{name:'历史 哲学'}]},
		{item:[{name:'经管'},{name:'励志经济 金融与投资'}]},
		{item:[{name:'生活'},{name:'生活 健身与保健'}]},
		{item:[{name:'科技'},{name:'工业技术 科普读物'}]},
		{item:[{name:'教育'},{name:'中小学教辅 教育与考试'}]}
	],
	carousel:[
		{categoryId:'5b89f0e379c3e82228c60d63',image:require('images/carousel/carousel1.jpg')},
		{categoryId:'5b89f0e379c3e82228c60d63',image:require('images/carousel/carousel2.jpg')},
		{categoryId:'5b89f0e379c3e82228c60d63',image:require('images/carousel/carousel3.jpg')},
	],
	floor:[
		{
			title:'F1 数码',
			item:[
				{categoryId:"5b89f0e379c3e82228c60d63",text:"华为",image:require('images/floor/floor01/floor01-01.jpg')},
				{categoryId:"5b89f0e379c3e82228c60d63",text:"小米",image:require('images/floor/floor01/floor01-02.jpg')},
				{categoryId:"5b89f0e379c3e82228c60d63",text:"Vivo",image:require('images/floor/floor01/floor01-03.jpg')},
				{categoryId:"5b89f0e379c3e82228c60d63",text:"OPPO",image:require('images/floor/floor01/floor01-04.jpg')},
				{categoryId:"5b89f0e379c3e82228c60d63",text:"iPhone",image:require('images/floor/floor01/floor01-05.jpg')}
			]
		},
		{
			title:'F2 服饰',
			item:[
				{categoryId:"5b89f0e379c3e82228c60d63",text:"手表",image:require('images/floor/floor02/floor02-01.jpg')},
				{categoryId:"5b89f0e379c3e82228c60d63",text:"帅哥",image:require('images/floor/floor02/floor02-02.jpg')},
				{categoryId:"5b89f0e379c3e82228c60d63",text:"外套",image:require('images/floor/floor02/floor02-03.jpg')},
				{categoryId:"5b89f0e379c3e82228c60d63",text:"鞋子",image:require('images/floor/floor02/floor02-04.jpg')},
				{categoryId:"5b89f0e379c3e82228c60d63",text:"夹克",image:require('images/floor/floor02/floor02-05.jpg')}
			]
		},
		{
			title:'F3 家装',
			item:[
				{categoryId:"5b89f0e379c3e82228c60d63",text:"榨汁机",image:require('images/floor/floor03/floor03-01.jpg')},
				{categoryId:"5b89f0e379c3e82228c60d63",text:"电饭煲",image:require('images/floor/floor03/floor03-02.jpg')},
				{categoryId:"5b89f0e379c3e82228c60d63",text:"音响",image:require('images/floor/floor03/floor03-03.jpg')},
				{categoryId:"5b89f0e379c3e82228c60d63",text:"床上用品",image:require('images/floor/floor03/floor03-04.jpg')},
				{categoryId:"5b89f0e379c3e82228c60d63",text:"流理台",image:require('images/floor/floor03/floor03-05.jpg')}
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
		$('.floor-wrap').html('<div class="loading"></div>')
		var html = _util.render(floorTpl,{
			floor:this.floor
		});
		$('.floor-wrap').html(html);
	}
}
$(function(){
	page.init()
});