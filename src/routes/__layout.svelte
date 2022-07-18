<script>
	import '../app.css';
</script>

<div class="container mx-auto">
	<div class="header bg-purple-300 text-center py-6">
		<h1 class="text-4xl">tinytimer</h1>
		<p>A stupid simple daily task timer.</p>
	</div>
	<div class="content p-6">
		<slot />
	</div>
</div>
