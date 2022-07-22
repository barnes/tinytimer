<script lang="ts">
	import Task from './Task.svelte';
	import { tasks, getTasks } from '$lib/taskStore';
	import { user } from '$lib/userStore';

	const taskObj = getTasks($user);
	console.log($tasks);

	export let archived: boolean;



	//TODO: Add a conditional prop, display archived.
</script>

<h1 class="text-3xl">Task List {archived ? 'Completed' : 'Current'}</h1>
<div class="flex flex-col gap-4">
	{#await taskObj}
		Loading ...
	{:then}
		{#each $tasks as task}
			{#if !archived}
				{#if !task.archived}
					<Task {task} />
				{/if}
			{:else if archived}
				{#if task.archived}
					<Task {task} />
				{/if}
			{/if}
		{/each}
	{/await}
</div>
