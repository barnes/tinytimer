<script type="ts">
	import '../app.css';
	import { supabase } from '$lib/db';
	import { user } from '$lib/userStore';
	import Nav from '../components/Nav.svelte';
	import { getTasks, tasks } from '$lib/taskStore';

	export async function load() {
		let user = supabase.auth.user();
		if (user) {
			tasks.set(await getTasks(user));
		}
		//console.log('from layout');
		//console.log($tasks);
	}

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(supabase.auth.user());
	});
</script>

<svelte:head>
	<title>tinytimer</title>
</svelte:head>

<div class="container mx-auto">
	<div class="header bg-purple-300 text-center py-6">
		<h1 class="text-4xl">tinytimer</h1>
		<p>A stupid simple daily task timer.</p>
	</div>
	<Nav />
	<div class="content p-6">
		<slot />
	</div>
</div>
