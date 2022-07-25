<script lang="ts">
	import Button from '../components/Button.svelte';
	import TextField from '../components/TextField.svelte';
	import NewTaskForm from '../components/NewTaskForm.svelte';
	import { supabase } from '$lib/db';
	import { user } from '$lib/userStore';
	import { createTask, deleteTask, tasks, getTasks, getTodaysTasks, getDays } from '$lib/taskStore';
	import TaskList from '../components/TaskList.svelte';
	import { onMount } from 'svelte';
	import LoginForm from '../components/LoginForm.svelte';

	let email = 'asdf';
	let loading = false;
	let checkEmailToggle = false;
	let today = new Date();
	let dayActive = true;

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

	const startDay = () => {
		console.log('Day starting');
		dayActive = !dayActive;
		getTodaysTasks($user);
	};

	const endDay = () => {
		console.log('End Day');
		dayActive = !dayActive;
	};
</script>

{#if $user != null}
	{#if dayActive}
		<h1>
			Welcome {$user.email}!
			{$user.id}
		</h1>
		<p>
			Start logging your tasks for today here. When your done for the day, hit end day to store your
			work for the day.
		</p>
		<NewTaskForm />

		{today}

		<TaskList archived={false} />
		<TaskList archived={true} />

		<Button label="End Day" disabled={false} on:click={getDays} />
	{:else}
		<Button label="Start Day!" disabled={false} on:click={startDay} />
	{/if}
{:else if $user == null}
	<LoginForm />
{/if}
