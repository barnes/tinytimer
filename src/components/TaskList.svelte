<script lang="ts">
	import Task from './Task.svelte';
	import { onMount } from 'svelte';
	import { tasks, getTasks } from '$lib/taskStore';
	import { user } from '$lib/userStore';

	const taskObj = getTasks($user);
	console.log($tasks);
	//console.log($tasks);

	// console.log('TASKSS IN TASKLIST' + $tasks);

	// tasks.subscribe((value) => {
	// 	console.log('TASKS UPDATED');
	// 	console.log($tasks);
	// });
</script>

<h1 class="text-3xl">Task List</h1>
<div class="flex flex-col gap-4">
	{#await taskObj}
		Loading ...
	{:then}
		{#each $tasks as task}
			<Task {task} />
		{/each}
	{/await}
</div>
