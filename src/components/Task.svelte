<script lang="ts">
	import { deleteTask, updateTime, toggleArchived, activeTimer, timedTask } from '$lib/taskStore';
	import type { Task } from '$lib/taskStore';
	import Button from './Button.svelte';
	import TextField from './TextField.svelte';

	export let task: Task;
	export let hotKey: string | null;
	console.log($activeTimer);
	let timeRunning = false;
	let toggleEdit = false;

	const formatTime = (time: number) => {
		let minutes: number;
		let seconds: number;
		let hours: number;
		if (time > 3600) {
			hours = Math.floor(time / 3600);
			minutes = Math.floor((time % 3600) / 60);
			seconds = (time % 3600) % 60;
			return `${hours}h${minutes}m${seconds}s`;
		} else if (time > 60) {
			minutes = Math.floor(time / 60);
			seconds = time % 60;
			return `${minutes}m${seconds}s`;
		} else {
			seconds = time;
			return `${seconds}s`;
		}
	};

	const soloTimer = async () => {
		if ($timedTask) {
			if ($activeTimer && $timedTask.id != task.id) {
				console.log('STATE1:' + $activeTimer + $timedTask.id);
				await updateTime(task);
				$activeTimer = true;
				$timedTask = task;
			} else if (!$activeTimer && $timedTask.id == task.id) {
				await updateTime(task);
				console.log('STATE2:' + $activeTimer + $timedTask.id);
				$activeTimer = true;
			} else if ($activeTimer && $timedTask.id == task.id) {
				await updateTime(task);
				console.log('STATE3:' + $activeTimer + $timedTask.id);
				$activeTimer = false;
			} else if (!$activeTimer && $timedTask.id != task.id) {
				await updateTime(task);
				console.log('STATE4:' + $activeTimer + $timedTask.id);
				$timedTask = task;
				$activeTimer = true;
			}
		} else {
			$timedTask = task;
			$activeTimer = true;
		}
	};

	setInterval(async () => {
		if ($activeTimer && $timedTask.id == task.id) {
			console.log('TIMER RUNNING');
			task.time++;
			if (task.time % 30 == 0) {
				await updateTime(task);
			}
		}
	}, 1000);

	// setInterval(async () => {
	// 	if (timeRunning) {
	// 		task.time++;
	// 		if (task.time % 30 == 0) {
	// 			await updateTime(task);
	// 		}
	// 	}
	// }, 1000);

	const recordTime = async () => {
		timeRunning = !timeRunning;
		if (task.time > 0) {
			await updateTime(task);
		}
	};

	const handleKey = async (event: any) => {
		if (document.activeElement?.tagName != 'INPUT') {
			if (event.key == hotKey) {
				recordTime();
			}
		}
	};

	const handleEdit = async () => {
		toggleEdit = !toggleEdit;
	};
</script>

<svelte:head>
	<!-- {#if timeRunning} -->
	<title>
		{formatTime(task.time)} : {task.text}
	</title>
	<!-- {:else}
		<title>tinytimer</title>
	{/if} -->
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<svelte:window on:keydown={handleKey} />

<div
	class="grid grid-cols-6 gap-4 justify-between border-2 border-purple-300 py-2 px-2 items-center {timeRunning
		? 'bg-purple-300'
		: ''} {task.archived ? 'bg-red-200' : ''}"
>
	<h1 class="text-xl">{task.text}</h1>
	<Button on:click={soloTimer} disabled={false}
		>{$activeTimer && $timedTask == task ? 'Stop' : 'Start'} {hotKey ? hotKey : ''}</Button
	>
	<span
		>Time Elapsed:
		{#if toggleEdit}
			<TextField password={false} bind:value={task.time} placeholder={task.time} />
		{:else}
			{formatTime(task.time)}
		{/if}
	</span>
	<Button
		on:click={() => {
			deleteTask(task);
		}}
		disabled={false}>Delete</Button
	>
	<div>
		<label for={task.id?.toString()}>Completed</label>
		<input
			id={task.id?.toString()}
			type="checkbox"
			bind:checked={task.archived}
			on:change={() => {
				toggleArchived(task);
			}}
		/>
	</div>
	<Button disabled={false} on:click={handleEdit}
		>{#if toggleEdit}Save{:else}Edit{/if}</Button
	>
</div>
