import { AnvilState } from "./Anvil.js";

const stateInstance = new AnvilState({
  player : "x",
  squares : Array(9),
  history : []
});

export const { state, subscribe, unsubscribe } = stateInstance;

export function togglePlayer() {
  state.player = state.player === "x" ? "o" : "x";
}

export function play(squareIndex) {
  state.history = [...state.history, [...state.squares]];
  state.squares = state.squares.with(squareIndex, state.player);
}

export function moveTo(moveIndex) {
  state.squares = [...state.history[moveIndex]];
}