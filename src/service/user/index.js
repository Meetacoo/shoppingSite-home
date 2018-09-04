require('./index.css');
const _util = require('util/index');
const _user = {
	logout: function () {
		$.ajax({
			url:'/user/layout',
			success:function(result){
				console.log(result)
			},
			error:function(err){
				console.log(err)
			}
		})
	}
}


module.exports = _user;
