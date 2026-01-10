import { createState } from "./createState.js";

const STORAGE_NAME = 'todos-web-components-proxy';

let storedState = localStorage.getItem(STORAGE_NAME);

const initialState = storedState ? JSON.parse(storedState) : { tasks : [], filter : null };

export const { state, onStateChange, offStateChange } = createState(initialState);

onStateChange(() => localStorage.setItem(STORAGE_NAME, JSON.stringify(state)));

export const { tasks } = state;