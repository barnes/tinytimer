<script lang="ts">
	import { supabase } from '$lib/db';
	import { user } from '$lib/userStore';

	const signOut = async () => {
		supabase.auth.signOut();
	};
</script>

<div class="nav flex flex-row space-between pb-4 justify-between w-1/4">
	{#if $user != null}
		<a href="/" class="bg-purple-300 py-2 px-2 ">Home</a>
		<a href="/history" class="bg-purple-300 py-2 px-2 ">History</a>
		<button on:click={signOut} class="bg-purple-300 py-2 px-2 ">Sign Out</button>
	{:else if $user == null}
		<a href="/" class="bg-purple-300 py-2 px-2 ">Home</a>
		<a href="/about" class="bg-purple-300 py-2 px-2 ">About</a>
	{/if}
</div>
