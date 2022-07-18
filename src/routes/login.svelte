<script lang="ts">
	import Button from '../components/Button.svelte';
	import TextField from '../components/TextField.svelte';
	import { supabase } from '$lib/db';

	let email = 'email';
	let loading = false;
	let checkEmailToggle = false;

	const magicLink = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signIn({ email });
			if (error) throw error;
			checkEmailToggle = true;
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	};
</script>

<h2 class="text-2xl">Sign Up with Magic Link</h2>
<p>Enter your email, and a link to login will be sent to you. No passwords, no nothing.</p>
<div class="flex flex-row justify-center py-2">
	<form on:submit|preventDefault={magicLink}>
		<TextField placeholder="email" bind:value={email} />
		<Button label="submit" disabled={loading} />
	</form>
</div>
{#if checkEmailToggle}
	<em>Check your email!</em>
{/if}
