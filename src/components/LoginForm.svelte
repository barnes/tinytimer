<script lang="ts">
	import { supabase } from '$lib/db';
	let checkEmailToggle: boolean = false;
	let loading: boolean = false;
	let email: string = 'email';
	let password: string;
	let passConfirm: string;
	import TextField from './TextField.svelte';
	import Button from './Button.svelte';

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

	const handleSignUp = async () => {
		if (!password) {
			await magicLink();
		} else {
			if (password == passConfirm) {
				try {
					loading = true;
					const { error } = await supabase.auth.signIn({ email, password });
				} catch (error) {
					console.error(error);
				} finally {
					loading = false;
				}
			}
		}
	};
</script>

<h2 class="text-2xl">Sign Up!</h2>
<div class="flex flex-row justify-center py-2">
	<form on:submit|preventDefault={handleSignUp}>
		<TextField
			placeholder="email"
			bind:value={email}
			password={false}
			on:focus={() => {
				email = '';
			}}
		/>
		<TextField
			placeholder="password"
			bind:value={password}
			password={true}
			on:focus={() => {
				email = '';
			}}
		/>
		<TextField
			placeholder="confirm password"
			bind:value={passConfirm}
			password={true}
			on:focus={() => {
				email = '';
			}}
		/>
		<Button disabled={loading}
			>{password ? 'Sign up With Password' : 'Sign up with Magic Link'}</Button
		>
		{#if password != passConfirm}
			<h1>Passwords do not match</h1>
		{/if}
	</form>
</div>
{#if checkEmailToggle}
	<em>Check your email!</em>
{/if}
