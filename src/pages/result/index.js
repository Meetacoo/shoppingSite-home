require('./index.css');
require('pages/common/logo')
require('pages/common/footer')

var _util = require('util');
$(function(){
	// console.log(window.location.href)
	// console.log(window.location.search.substr(1))
	var type = _util.getParamFromUrl('type') || 'default';
	// console.log(type)
	$('.' + type).show();
})