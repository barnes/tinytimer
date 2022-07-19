import { writable } from 'svelte/store';
import { supabase } from '$lib/db.js';

export const tasks = writable();

interface Task  {
	'uuid': string,
	'text': string,
	'time': number,
	'recurring': boolean

}

export const createTask = async (task: object) => {
	console.log(supabase.auth.session());
	const { data, error } = await supabase.from('tasks').insert(task);
	if (error) {
		console.error(error);
	} else {
		console.log('CREATE: ' + data);
	}
};

export const deleteTask = async (taskID: string) => {
	console.log(supabase.auth.session());
	const { data, error } = await supabase.from('tasks').delete().eq('id', taskID);
	if (error) {
		console.error(error);
	} else {
		console.log('DELETE:' + data);
	}
};

export const updateTask = async (task: Task) => {
	console.log(supabase.auth.session());
	const { data, error } = await supabase.from('tasks').update({ time: task.time }).eq('id', task.id)
	if (error) {
		console.error(error);
	} else {
		
	}
};

export const getTasks = async (userID) => {
	const { data, error } = await supabase.from('tasks').select('*').eq('uuid', userID);
	if (error) {
		console.error(error);
	} else {
		tasks.set(data);
		return(data);
	}
};
