<script lang="ts">
	import Task from './Task.svelte';
	import { tasks, getTasks, keyOptions } from '$lib/taskStore';
	import { user } from '$lib/userStore';

	const taskObj = getTasks($user);
	console.log($tasks);

	export let archived: boolean;
</script>

<h1 class="text-3xl py-4">Task List {archived ? 'Completed' : 'Current'}</h1>
<div class="flex flex-col gap-4">
	{#await taskObj}
		Loading ...
	{:then}
		{#each $tasks as task, i}
			{#if !archived}
				{#if !task.archived}
					<Task {task} hotKey={keyOptions[i]} />
				{/if}
			{:else if archived}
				{#if task.archived}
					<Task {task} />
				{/if}
			{/if}
		{/each}
	{/await}
</div>
