require('./index.css');

var _util = require('util');

var page = {
	init: function(){
		this.onLoad();
		this.bindEvent();
		return this;
	},
	onLoad:function(){
		// var keyword = $.trim($('#search-input').val());
		var keyword = _util.getParamFromUrl('keyword');
		if (keyword) {
			$('#search-input').val(keyword)
		}
	},
	bindEvent:function(){
		var _this = this;
		$('#search-btn').on('click',function(){
			_this.submit();
		})

		$('#search-input').on('keyup',function(e){
			if (e.keyCode == 13) {
				_this.submit();
			}
		})
		
	},
	submit:function(){
		var keyword = $.trim($('#search-input').val());
		// 2: 验证成功
		if (keyword) {
			window.location.href = './list.html?keyword='+keyword;
			// console.log(keyword)
		} 
		// 3: 验证失败
		else {
			_util.goHome();
		}
	}
}

module.exports = page.init();