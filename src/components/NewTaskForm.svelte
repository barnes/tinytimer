<script lang="ts">
	import Button from './Button.svelte';
	import { createTask, getTasks } from '$lib/taskStore';
	import { user } from '$lib/userStore';
	import TextField from './TextField.svelte';

	let task = {
		uuid: $user.id,
		text: ''
	};
</script>

<TextField placeholder="new tasks" password={false} bind:value={task.text} />
<Button
	label="Test Create Task"
	disabled={false}
	on:click={() => {
		createTask(task);
		getTasks($user.id);
	}}
/>
