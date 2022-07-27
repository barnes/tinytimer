<script lang="ts">
	import { tasks, getTasks } from '$lib/taskStore';
	import { user } from '$lib/userStore';
	import Task from '../components/Task.svelte';

	let days: Array<Date> = [];
	const taskList = getTasks($user);
	console.log($tasks);

	$tasks.forEach((task) => {
		if (!days.includes(task.dateCompleted)) {
			days.push(task.dateCompleted);
		}
	});

	console.log(days);
</script>

{#each days as day}
	<h1 class="text-3xl py-4">{day}</h1>
	{#each $tasks as task}
		{#if task.dateCompleted == day}
			<Task {task} />
		{/if}
	{/each}
{/each}
