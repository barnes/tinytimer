<script lang="ts">
	import Task from './Task.svelte';

	export let tasks: object;

	let taskArray = Object.values(tasks);
</script>

<h1 class="text-3xl">Task List</h1>
<div class="flex flex-col gap-4" />
{#each taskArray as task}
	<Task {task} />
{/each}
