<script lang="ts">
	import Button from './Button.svelte';
	import { createTask, getTasks } from '$lib/taskStore';
	import { user } from '$lib/userStore';
	import type { Task } from '$lib/taskStore';
	import TextField from './TextField.svelte';

	let task: Task = {
		uuid: $user.id,
		text: '',
		time: 0,
		recurring: false,
		archived: false,
		dateCompleted: new Date()
	};

	const handleSubmit = async () => {
		await createTask(task);
		task.text=''
		await getTasks($user);
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<TextField placeholder="new tasks" password={false} bind:value={task.text} />
	<Button disabled={false}>Submit</Button>
</form>
