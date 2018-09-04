const _util = {
	request:function(params){
		$.ajax({
			url:params.url || '',
			method:params.method || 'get',
			dataType:params.dataType ||'json',
			data:params.data || '',
			success:function(result){
				if (result.code === 0) {
					params.success && params.success(result.data)
				} else if(result.code === 10) {
					window.location.href='./user-login.html'
				} else if(result.code === 1) {
					params.error && params.error(result.message)
				}
			},
			error:function(err){
				params.error && params.error(err.statusText)
			}
		})
	}
}


module.exports = _util;