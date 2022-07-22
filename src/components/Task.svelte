<script lang="ts">
	import { deleteTask, updateTime, toggleArchived, getTasks } from '$lib/taskStore';
	import type { Task } from '$lib/taskStore';
	import Button from './Button.svelte';
	import { user } from '$lib/userStore';

	export let task: Task;
	let timeRunning = false;

	const formatTime = (time: number) => {
		if (time > 60) {
			let minutes = Math.floor(time / 60);
			let seconds = time % 60;
			return `${minutes}m${seconds}s`;
		} else {
			return `${time}s`;
		}
	};

	setInterval(async () => {
		if (timeRunning) {
			task.time++;
			if (task.time % 30 == 0) {
				await updateTime(task);
			}
		}
	}, 1000);

	const recordTime = async () => {
		timeRunning = !timeRunning;
		if (task.time > 0) {
			await updateTime(task);
		}
	};
</script>

<div
	class="grid grid-cols-5 gap-4 justify-between border-2 border-purple-300 py-2 px-2 items-center {timeRunning
		? 'bg-purple-300'
		: ''} {task.archived ? 'bg-red-200' : ''}"
>
	<h1 class="text-xl">{task.text}</h1>
	<Button on:click={recordTime} label={timeRunning ? 'Stop' : 'Start'} disabled={false} />
	<span>Time Elapsed: {formatTime(task.time)}</span>
	<Button on:click={deleteTask(task)} label="Delete" disabled={false} />
	<div>
		<label for={task.id}>Completed</label>
		<input
			id={task.id}
			type="checkbox"
			bind:checked={task.archived}
			on:change={() => {
				toggleArchived(task);
			}}
		/>
	</div>
</div>
