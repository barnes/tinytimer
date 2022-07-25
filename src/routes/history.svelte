<script lang="ts">
	import { sorted, tasks, daysStore, getDays, getTasks } from '$lib/taskStore';
	import { user } from '$lib/userStore';
	import { onMount } from 'svelte';
	import Task from '../components/Task.svelte';
	onMount(async () => {
		await getDays();
		await getTasks($user);
	});

	console.log($daysStore);
	console.log($tasks);
</script>

{#await daysStore}
	{#each $daysStore as day}
		{day}
		{#each $tasks as task}
			{#if task.dateCompeted == day}
				<Task {task} />
			{/if}
		{/each}
	{/each}
{/await}
