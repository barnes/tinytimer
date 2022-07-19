<script lang="ts">
	import Task from './Task.svelte';
	import { onMount } from 'svelte';
	import { tasks, getTasks } from '$lib/taskStore';
	import { user } from '$lib/userStore';

	const taskObj = getTasks($user.id);

	console.log("TASKSS IN TASKLIST" + $tasks);


	tasks.subscribe(value => {
		console.log('TASKS UPDATED'); 
		console.log($tasks);
	})



</script>

<h1 class="text-3xl">Task List</h1>
<div class="flex flex-col gap-4">
	{#if !$tasks}
		{#await taskObj}
			Loading...
		{:then data}
			{#each data as task}
				<Task {task} />
			{/each}
		{/await}
	{:else}
		{#each $tasks as task}
			<Task {task} />
		{/each}
	{/if}

</div>



