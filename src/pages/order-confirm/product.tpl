{{#notEmpty}}
<ul class="product-title clearfix">
	<li class="product-info">商品信息</li>
	<li class="product-price">单价</li>
	<li class="product-count">数量</li>
	<li class="product-totalPrice">小计</li>
</ul>
{{#cartList}}
<ul class="product-item clearfix" data-product-id="{{productInfo._id}}">
	<li class="product-info">
		<a href="./detail.html?productId={{productInfo._id}}" target="_blank" class="link">
			<img src="{{productInfo.image}}" alt=""> 
			<span>{{productInfo.name}}</span>
		</a>
	</li>
	<li class="product-price">
		￥ {{productInfo.price}}
	</li>
	<li class="product-count">
		<input type="text" class="count-input" data-stock="{{productInfo.stock}}" value="{{count}}" readonly>
	</li>
	<li class="product-totalPrice">￥ {{totalPrice}}</li>
</ul>
{{/cartList}}
<ul class="product-footer clearfix">
	<li class="product-submit">
		<span class="total-price-text">总价</span>
		<span class="total-price">￥ {{totalCartPrice}}</span>
		<a href="javascript:;" class="btns btn-submit link">确认支付</a>
	</li>
</ul>
{{/notEmpty}}
{{^notEmpty}}
<p class="empty-message">还未选中任何商品!!!</p>
<a href="./cart.html" class="btns link gocart-btn">去选择商品购买支付</a>
{{/notEmpty}}