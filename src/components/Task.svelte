<script lang="ts">
	import { deleteTask, updateTask } from '$lib/taskStore';
	import Button from './Button.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let task: object;
	let startTime: number;
	let endTime: number;
	let timeRunning = false;
	let formattedTime: string;

	const formatTime = (time: number) => {
		if(time > 60){
			let minutes = Math.floor(time/60);
			let seconds = time%60;
			return `${minutes}m${seconds}s`
		} else {
			return `${time}s`
		}
	}

	setInterval( async () => {
    	if(timeRunning){
			task.time++;
			if(task.time%30 ==0 ){
				await updateTask(task);
			}
		}
  	},1000);

	const recordTime = async () => {
		timeRunning = !timeRunning
		if (task.time > 0){
			await updateTask(task);
		}
	}


</script>
{#if timeRunning}
	<div class="flex flex-row justify-between border-2 border-purple-300 py-2 px-2 items-center bg-purple-100">
		<h1 class="text-xl">{task.text}</h1>
		<Button on:click={recordTime} label={timeRunning ? 'Stop' : 'Start'} />
		<span>Time Elapsed: {formatTime(task.time)}</span>
		<Button on:click={deleteTask(task.id)} label="Delete" />
	</div>
{:else}
	<div class="flex flex-row justify-between border-2 border-purple-300 py-2 px-2 items-center">
		<h1 class="text-xl">{task.text}</h1>
		<Button on:click={recordTime} label={timeRunning ? 'Stop' : 'Start'} />
		<span>Time Elapsed: {formatTime(task.time)}</span>
		<Button on:click={deleteTask(task.id)} label="Delete" />
	</div>
{/if}
