{{#floor}}
<div class="floor-box">
	<h2 class="floor-title">{{title}}</h2>
	<ul class="floor-list clearfix">
		{{#item}}
		<li class="floor-item">
			<a href="./list.html?categoryId={{categoryId}}">
				<p class="floor-category">{{text}}</p>
				<!-- <img src="<%= require('../images/floor/floor01/floor01-01.jpg')%>" alt="" class="floor-img"> -->
				<img src="{{image}}" alt="" class="floor-img">
			</a>
		</li>
		{{/item}}
	</ul>
</div>
{{/floor}}