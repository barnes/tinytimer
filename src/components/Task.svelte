<script lang="ts">
	import { deleteTask } from '$lib/taskStore';
	import Button from './Button.svelte';

	export let task: object;
</script>

<div class="flex flex-row justify-between border-2 border-purple-300">
	<h1 class="text-2xl uppercase">{task.id}</h1>
	<h1 class="text-xl">{task.text}</h1>
	<Button on:click={deleteTask(task.id)} label="Delete Task" />
</div>
