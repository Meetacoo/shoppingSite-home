<div class="panel">
	<h2 class="panel-header">送货地址</h2>
	<div class="panel-body clearfix">
		{{#shippings}}
		{{#isActive}}
		<div class="shipping-item active" data-shipping-id="{{_id}}">
		{{/isActive}}
		{{^isActive}}
		<div class="shipping-item" data-shipping-id="{{_id}}">
		{{/isActive}}
			<h3 class="shipping-title">
				{{province}} {{city}} ({{name}})
			</h3>
			<p class="shipping-detail">
				{{province}} {{city}} {{address}} {{phone}}
			</p>
			<div class="shipping-footer">
				<span class="link shipping-delete">删除</span>
				<span class="link shipping-edit">编辑</span>
			</div>
		</div>
		{{/shippings}}
		<div class="shipping-add">
			<i class="fa fa-plus"></i><br>
			添加新地址
		</div>
	</div>
</div>