<ul class="pagination-list">
	{{#pageArray}}
		{{#disabled}}
			{{#active}}
				{{#disabled}}
					<li class="pagination-item disabled" data-value="{{value}}">{{name}}</li>
				{{/disabled}}
				{{^disabled}}
					<li class="pagination-item active" data-value="{{value}}">{{name}}</li>
				{{/disabled}}
			{{/active}}
			{{^active}}
				<li class="pagination-item" data-value="{{value}}">{{name}}</li>
			{{/active}}
		{{/disabled}}
	{{/pageArray}}
</ul>