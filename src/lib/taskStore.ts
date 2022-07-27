import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { supabase } from '$lib/db.js';
import type { User } from '@supabase/supabase-js';

const user: User | null = supabase.auth.user();
export const tasks: Writable<Array<Task>> = writable();
export const activeTimer = writable(false);

export const keyOptions = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];

export interface Task {
	id?: number | null;
	uuid: string;
	text: string;
	time: number;
	recurring: boolean;
	archived: boolean;
	dateCompleted: Date;
}

export interface TodaysTasks {
	id?: number;
	uuid: string;
	date: Date;
	tasks: Array<Task['id']>;
}

export const createTask = async (task: Task) => {
	const { data, error } = await supabase.from('tasks').insert(task);
	if (error) {
		console.error(error);
		return error;
	} else {
		console.log('CREATE: ' + data);
		getTasks(user);
		return data;
	}
};

export const deleteTask = async (task: Task) => {
	const { data, error } = await supabase.from('tasks').delete().eq('id', task.id);
	if (error) {
		console.error(error);
		return error;
	} else {
		console.log('DELETE:' + data);
		getTasks(user);
		return data;
	}
};

export const updateTime = async (task: Task) => {
	const { data, error } = await supabase
		.from('tasks')
		.update({ time: task.time })
		.eq('id', task.id);
	if (error) {
		console.error(error);
		return error;
	} else {
		getTasks(user);
		return data;
	}
};

export const getTasks = async (user: User | null) => {
	if (user) {
		const { data, error } = await supabase
			.from('tasks')
			.select('*')
			.eq('uuid', user.id)
			.order('id', { ascending: false });
		if (error) {
			console.error(error);
			return error;
		} else {
			tasks.set(data);
			return data;
		}
	}
};

export const getTodaysTasks = async (user: User) => {
	const today = new Date();
	const { data, error } = await supabase.from('tasks').select('*').eq('dateCompleted', today);
	if (error) {
		console.log(error);
		return error;
	} else {
		console.log('got days');
		return error;
	}
};

export const toggleArchived = async (task: Task) => {
	console.log(task);
	//console.log(task.archived ? false : true);
	const { data, error } = await supabase
		.from('tasks')
		.update({ archived: task.archived })
		.eq('id', task.id);
	if (error) {
		console.error(error);
		return error;
	} else {
		console.log('updated archived');
		getTasks(user);
		return data;
	}
};
