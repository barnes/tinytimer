<script lang="ts">
    import { supabase } from '$lib/db'
    let checkEmailToggle: boolean = false;
    let loading: boolean = false;
    let email: string = 'email';
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

</script>

<h2 class="text-2xl">Sign Up with Magic Link</h2>
<p>Enter your email, and a link to login will be sent to you. No passwords, no nothing.</p>
<div class="flex flex-row justify-center py-2">
    <form on:submit|preventDefault={magicLink}>
        <TextField placeholder="email" bind:value={email} password={false}  on:focus="{() => {email = ''}}"/>
        <Button label="submit" disabled={loading} />
    </form>
</div>
{#if checkEmailToggle}
    <em>Check your email!</em>
{/if}