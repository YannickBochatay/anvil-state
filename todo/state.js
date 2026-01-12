// @ts-check

import { createState } from "./createState.js";

/**
 * @typedef {object} Task        – 
 * @property {string} title      – task title
 * @property {boolean} completed – task is to do or done
 */

/**
 * @typedef {object} State
 * @property {Task[]} tasks
 * @property {string} filter
 */

const STORAGE_NAME = 'todos-web-components-proxy';

let storedState = localStorage.getItem(STORAGE_NAME);

/** @type {State} */
const initialState = storedState ? JSON.parse(storedState) : { tasks : [], filter : null };

const proxiedState = createState(initialState);

/** @type {State} */
export const state = proxiedState.state;

export const { onStateChange, offStateChange } = proxiedState

onStateChange(() => localStorage.setItem(STORAGE_NAME, JSON.stringify(state)));

export const { tasks } = state;