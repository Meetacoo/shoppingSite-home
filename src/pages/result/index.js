require('pages/common/logo')
require('pages/common/footer')
require('./index.css');

var _util = require('util');
$(function(){
	// console.log(window.location.href)
	// console.log(window.location.search.substr(1))
	var type = _util.getParamFromUrl('type') || 'default';
	// console.log(type)

	if (type == "payment") {
		var orderNo = _util.getParamFromUrl("orderNo");
		var href = $(".order-detail").attr('href');
		var newHref = href + orderNo;
		$(".order-detail").attr('href',newHref)
	}
	$('.' + type).show();
})