import { State } from "./lib/State.js"

const todoState = new State([{ label : "buy a unicorn", done : false }]);

export const { state, subscribe, unsubscribe } = todoState;