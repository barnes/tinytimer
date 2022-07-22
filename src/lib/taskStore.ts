import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { supabase } from '$lib/db.js';
import type { User } from '@supabase/supabase-js';

const user: User = supabase.auth.user();
export const tasks = writable();
export const todaysTasks: Writable<TodaysTasks> = writable();

export interface Task {
	id?: number;
	uuid: string;
	text: string;
	time: number;
	recurring: boolean;
	archived: boolean;
	dateCompleted: Date;
}

export interface TodaysTasks {
	id?: number,
	uuid: string,
	date: Date
	tasks: Array<Task["id"]>
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

export const getTasks = async (user: User) => {
	const { data, error } = await supabase
		.from('tasks')
		.select('*')
		.eq('uuid', user.id)
		.order('id', { ascending: false });
	if (error) {
		console.error(error);
		return error
	} else {
		tasks.set(data);
		return data
	}
};

export const getTodaysTasks = async (user: User) => {
	const today = new Date();
	const { data, error } = await supabase.from('tasks').select('*').eq('dateCompleted', today);
	if(error){
		console.log(error);
		return error
	} else {
		console.log('got days');
		return error
	}
}

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

export const saveDay = async (tasks: TodaysTasks) => {
	const { data, error } = await supabase.from('days').insert(tasks)
	if (error) {
		console.error(error);
		return error;
	} else {
		console.log('logged day');
		getTasks(user);
		return data;
	}

}
