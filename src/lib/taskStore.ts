import { writable } from 'svelte/store';
import { supabase } from '$lib/db.js';
import type { User } from '@supabase/supabase-js';

export const tasks = writable();

export interface Task {
	id?: number;
	uuid: string;
	text: string;
	time?: number;
	recurring?: boolean;
}

export const createTask = async (task: Task) => {
	const { data, error } = await supabase.from('tasks').insert(task);
	if (error) {
		console.error(error);
	} else {
		console.log('CREATE: ' + data);
	}
};

export const deleteTask = async (task: Task) => {
	const { data, error } = await supabase.from('tasks').delete().eq('id', task.id);
	if (error) {
		console.error(error);
	} else {
		console.log('DELETE:' + data);
	}
};

export const updateTask = async (task: Task) => {
	const { data, error } = await supabase
		.from('tasks')
		.update({ time: task.time })
		.eq('id', task.id);
	if (error) {
		console.error(error);
	} else {
	}
};

export const getTasks = async (user: User) => {
	const { data, error } = await supabase
		.from('tasks')
		.select('*')
		.eq('uuid', user.id)
		.order('id', { ascending: false });
	if (error) {
		console.error(error);
	} else {
		tasks.set(data);
		return data;
	}
};
