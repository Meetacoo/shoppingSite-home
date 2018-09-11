{{#notEmpty}}
<ul class="cart-title clearfix">
	<li class="product-select">
		{{#allChecked}}
		<input type="checkbox" class="select-all" checked />
		{{/allChecked}}
		{{^allChecked}}
		<input type="checkbox" class="select-all"  />
		{{/allChecked}}	
		<span>全选</span>
	</li>
	<li class="product-info">商品信息</li>
	<li class="product-price">单价</li>
	<li class="product-count">数量</li>
	<li class="product-totalPrice">小计</li>
	<li class="product-opreation">操作</li>
</ul>
{{#cartList}}
<ul class="cart-item clearfix" data-product-id="{{productInfo._id}}">
	<li class="product-select">
		{{#checked}}
		<input type="checkbox" class="select-one" checked />
		{{/checked}}
		{{^checked}}
		<input type="checkbox" class="select-one" />
		{{/checked}}	
	</li>
	<li class="product-info">
		<a href="./detai.html?productId={{productInfo._id}}" class="link">
			<img src="{{productInfo.image}}" alt=""> 
			<span>{{productInfo.name}}</span>
		</a>
	</li>
	<li class="product-price">
		{{productInfo.price}}
	</li>
	<li class="product-count">
		<span class="count-btn minus">-</span><input type="text" class="count-input" value="{{count}}" readonly><span class="count-btn plus">+</span>
	</li>
	<li class="product-totalPrice">￥ {{totalPrice}}</li>
	<li class="product-opreation">
		<span class="delete-one">
			<i class="fa fa-trash-o"></i>
			删除
		</span>
	</li>
</ul>
{{/cartList}}
<ul class="cart-footer clearfix">
	<li class="product-select">
		<!-- <input type="checkbox" class="select-all"> -->
		{{#allChecked}}
		<input type="checkbox" class="select-all" checked />
		{{/allChecked}}
		{{^allChecked}}
		<input type="checkbox" class="select-all"  />
		{{/allChecked}}
		<span>全选</span>
	</li>
	<li class="product-opreation">
		<span class="delete-selected">
			<i class="fa fa-trash-o"></i>
			删除选中
		</span>
	</li>
	<li class="product-submit">
		<span class="total-price-text">总价</span>
		<span class="total-price">￥ {{totalCartPrice}}</span>
		<a href="javascript:;" class="btns btn-submit link">去结算</a>
	</li>
</ul>
{{/notEmpty}}
{{^notEmpty}}
<p class="empty-message">购物车空空如也!!!
<a href="/" class="btn gohome-btn">立即去购物</a></p>

{{/notEmpty}}