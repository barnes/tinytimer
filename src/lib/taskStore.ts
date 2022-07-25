import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { supabase } from '$lib/db.js';
import type { User } from '@supabase/supabase-js';
import parseDate from 'postgres-date';

const user: User | null = supabase.auth.user();
export const tasks: Writable<Array<Tasks>> = writable();
export const todaysTasks: Writable<TodaysTasks> = writable();
export const daysStore: Writable<Array<string>> = writable([]);
export const sorted = writable({});

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

export const saveDay = async (tasks: TodaysTasks) => {
	const { data, error } = await supabase.from('days').insert(tasks);
	if (error) {
		console.error(error);
		return error;
	} else {
		console.log('logged day');
		getTasks(user);
		return data;
	}
};

//Need to figure out how to sort;
// {
// 	'2022-07-22': [12,14,15],
// 	'2022-07-23': [10,9,8]
// }

export const getDays = async () => {
	const { data, error } = await supabase.from('tasks').select('dateCompleted');
	if (error) {
		console.log(error);
		return error;
	} else {
		let array = [];
		data.forEach((day) => {
			if (!array.includes(day.dateCompleted)) {
				array.push(day.dateCompleted);
			}
		});
		daysStore.set(array);
		return data;
	}
};

// export const getDays = async () => {
// 	const { data, error } = await supabase.from('tasks').select('dateCompleted, id');
// 	if (error) {
// 		console.log(error);
// 		return error;
// 	} else {
// 		let object = {};
// 		//console.log(data);
// 		data.forEach((task, i) => {
// 			// console.log(i, task);
// 			if (task.dateCompleted in object) {
// 				//array[i].push([task.id, );
// 				object[`${task.dateCompleted}`].push(task.id);
// 			} else {
// 				object[`${task.dateCompleted}`] = [];
// 				object[`${task.dateCompleted}`].push(task.id);
// 				//array[i].push(task.id);
// 			}
// 		});
// 		//console.log(object);
// 		sorted.set(object);
// 		return object;
// 	}
// };
