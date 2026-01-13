// @ts-check

import { createState } from "./createState.js";

/**
 * @typedef {object} Task        – todo task
 * @property {string} title      – task title
 * @property {boolean} completed – task is to do or done
 */

/**
 * @typedef {object} State         – app state
 * @property {Task[]} tasks        – task list
 * @property {string} filter       – type of tasks displayed
 * @property {number|null} editing – index of task being edited
 */

const STORAGE_NAME = 'todos-web-components-proxy-ts';

let storedState = localStorage.getItem(STORAGE_NAME);

/** @type {State} */
const initialState = storedState ? JSON.parse(storedState) : { tasks : [], filter : null, editing : null };

const proxiedState = createState(initialState);

/** @type {State} */
export const state = proxiedState.state;

export const { onStateChange, offStateChange } = proxiedState;

onStateChange(() => localStorage.setItem(STORAGE_NAME, JSON.stringify(state)));

export const { tasks } = state;