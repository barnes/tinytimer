<script lang="ts">
	import Button from '../components/Button.svelte';
	import TextField from '../components/TextField.svelte';
	import NewTaskForm from '../components/NewTaskForm.svelte';
	import { supabase } from '$lib/db';
	import { user } from '$lib/userStore';
	import { createTask, deleteTask, tasks, getTasks } from '$lib/taskStore';
	import TaskList from '../components/TaskList.svelte';
	import { onMount } from 'svelte';

	let email = 'email';
	let loading = false;
	let checkEmailToggle = false;
	let timerTracking = false;
	let startTime: number;
	let endTime: number;
	let timeDiff: number;
	let timeFormatted: number;
	let currentUser: string;

	// onMount(async () => {
	// 	let data = await getTasks($user.id);
	// 	console.log($tasks)
	// });

	

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

{#if $user != null}
	<h1>
		Welcome {$user.email}!
		{$user.id}
	</h1>
	<NewTaskForm />

	<TaskList />

{:else if $user == null}
	<h2 class="text-2xl">Sign Up with Magic Link</h2>
	<p>Enter your email, and a link to login will be sent to you. No passwords, no nothing.</p>
	<div class="flex flex-row justify-center py-2">
		<form on:submit|preventDefault={magicLink}>
			<TextField placeholder="email" bind:value={email} password={false} />
			<Button label="submit" disabled={loading} />
		</form>
	</div>
	{#if checkEmailToggle}
		<em>Check your email!</em>
	{/if}
{/if}
