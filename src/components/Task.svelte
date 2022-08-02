<script lang="ts">
	import {
		deleteTask,
		updateTime,
		toggleArchived,
		activeTimer,
		timedTask,
		previousTask
	} from '$lib/taskStore';
	import type { Task } from '$lib/taskStore';
	import Button from './Button.svelte';
	import TextField from './TextField.svelte';

	export let task: Task;
	export let hotKey: string | null;
	console.log($activeTimer);
	let timeRunning = false;
	let toggleEdit = false;
	let recording = false;

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

	// const soloTimer = async () => {
	// 	if ($previousTask) {
	// 		updateTime($previousTask);
	// 	}
	// 	if ($timedTask) {
	// 		if ($activeTimer && $timedTask.id != task.id) {
	// 			console.log('STATE1:' + $activeTimer + $timedTask.id);
	// 			await updateTime(task);
	// 			$activeTimer = true;
	// 			$timedTask = task;
	// 			$previousTask = task;
	// 			recording = false;
	// 		} else if (!$activeTimer && $timedTask.id == task.id) {
	// 			await updateTime(task);
	// 			console.log('STATE2:' + $activeTimer + $timedTask.id);
	// 			$activeTimer = true;
	// 			recording = true;
	// 			$previousTask = task;
	// 		} else if ($activeTimer && $timedTask.id == task.id) {
	// 			await updateTime(task);
	// 			console.log('STATE3:' + $activeTimer + $timedTask.id);
	// 			$activeTimer = false;
	// 			$previousTask = task;
	// 			recording = false;
	// 		} else if (!$activeTimer && $timedTask.id != task.id) {
	// 			await updateTime(task);
	// 			console.log('STATE4:' + $activeTimer + $timedTask.id);
	// 			$timedTask = task;
	// 			$previousTask = task;
	// 			$activeTimer = true;
	// 			recording = true;
	// 		}
	// 	} else {
	// 		$timedTask = task;
	// 		$activeTimer = true;
	// 		$previousTask = task;
	// 	}
	// };

	const soloTimerRefactor = async () => {
		if ($timedTask) {
			if ($activeTimer) {
				if ($timedTask.id == task.id) {
					console.log('ACTIVE RECORDING STATE, STOPPING RECORDING');
					await updateTime(task);
					$activeTimer = false;
					recording = false;
				} else if ($timedTask.id != task.id) {
					console.log('ACTIVE RECORDING, WRONG TASK');
					console.log(task.id);
					console.log($timedTask.id);
					await updateTime($timedTask);
					$timedTask = task;
					//$activeTimer = false;
				}
			} else {
				if ($timedTask.id == task.id) {
					console.log('NOT RECORDING, STARTING RECORDING');
					$activeTimer = true;
					recording = true;
				} else if ($timedTask.id != task.id) {
					console.log('NOT RECORDING, WRONG TASK');
					$timedTask = task;
					$activeTimer = true;
					recording = true;
				}
			}
		} else {
			console.log('INITIAL STATE, SETTING TASK');
			$timedTask = task;
			$activeTimer = true;
			recording = true;
		}
	};

	setInterval(async () => {
		if ($activeTimer && $timedTask.id == task.id) {
			console.log('TIMER RUNNING');
			//task.time++;
			$timedTask.time++;
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
				soloTimerRefactor();
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
	class="grid grid-cols-6 gap-4 justify-between border-2 border-purple-300 py-2 px-2 items-center {$activeTimer
		? 'bg-purple-300'
		: ''} {task.archived ? 'bg-red-200' : ''}"
>
	<h1 class="text-xl">{task.text}</h1>
	<Button on:click={soloTimerRefactor} disabled={false}
		>{$activeTimer ? 'Stop' : 'Start'} {hotKey ? hotKey : ''}</Button
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
