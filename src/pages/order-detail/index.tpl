{{#notEmpty}}
<ul class="product-title clearfix">
	<li class="product-info">商品信息</li>
	<li class="product-price">单价</li>
	<li class="product-count">数量</li>
	<li class="product-totalPrice">小计</li>
</ul>
{{#order}}
	<ul class="order-title clearfix">
		<li class="order-no">
			<span class="lable">订单号:</span>
			<span class="text">{{orderNo}}</span>
		</li>
		<li class="order-created-time">
			<span class="lable">创建时间:</span>
			<span class="text">{{createdTime}}</span>
		</li>
		<li class="order-shipping-name">
			<span class="lable">收件人:</span>
			<span class="text">{{shipping.name}}({{shipping.phone}})</span>
		</li>
		<li class="order-shipping-address">
			<span class="lable">收货地址:</span>
			<span class="text">{{shipping.province}} {{shipping.city}} {{shipping.address}} (邮编:{{shipping.zip}})</span>
		</li>
		<li class="order-status-desc">
			<span class="lable">订单状态:</span>
			<span class="text">{{statusDesc}}</span>
		</li>
		<li class="order-payment">
			<span class="lable">订单金额:</span>
			<span class="text">￥ {{payment}}</span>
		</li>
		<li class="order-paymentTypeDesc">
			<span class="lable">支付方式:</span>
			<span class="text">{{paymentTypeDesc}}</span>
		</li>
		<li class="order-detail">
			{{#needPay}}
			<a href="./payment.html?orderNo={{orderNo}}" class="btns go-submit-btn">去支付</a>
			{{/needPay}}
			{{#canCancel}}
			<span class="btns cancel-order-btn">取消支付</span>
			{{/canCancel}}
		</li>
		<li class="order-detail">
		</li>
	</ul>
{{/order}}
{{#order.productList}}
	<ul class="product-item clearfix">
		<li class="product-info">
			<a href="./detail.html?productId={{productId}}" target="_blank" class="link">
				<img src="{{image}}" alt=""> 
				<span>{{name}}</span>
			</a>
		</li>
		<li class="product-price">
			￥ {{price}}
		</li>
		<li class="product-count">
			{{count}}
		</li>
		<li class="product-totalPrice">￥ {{totalPrice}}</li>
	</ul>
{{/order.productList}}
{{/notEmpty}}
{{^notEmpty}}
<p class="empty-message">还未选中任何商品!!!</p>
<a href="./cart.html" class="btns link gocart-btn">去选择商品购买支付</a>
{{/notEmpty}}