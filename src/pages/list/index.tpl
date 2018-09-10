<ul class="product-list">
	{{#list}}
	<li class="product-item">
		<a href="./detail.html?productId={{_id}}">
			<img class="product-img" src="{{image}}" alt="{{name}}">
			<p class="product-price">￥ {{price}}</p>
			<p class="product-name">{{name}}</p>
		</a>
	</li>
	{{/list}}
</ul>
{{^list}}
<p class="empty-msg">沒找到</p>
{{/list}}