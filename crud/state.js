// @ts-check

import { createState } from "./createState.js"

/**
 * @typedef {object} Person
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 */

/**
 * @typedef {object} State
 * @property {Person[]} list
 */

const STORAGE_NAME = 'anvil-crud';

let storedState = localStorage.getItem(STORAGE_NAME);

/** @type {State} */
const initialState = storedState ? JSON.parse(storedState) : {
  list : [{
    firstName : "Yannick",
    lastName : "Bochatay",
    email : "yannick.bochatay@free.fr"
  }, {
    firstName : "Diane",
    lastName : "Osinski",
    email : "diane.osinski@zaclys.net"
  }]
}

export const { state /** @type State */, onStateChange, offStateChange } = createState(initialState)

onStateChange(() => localStorage.setItem(STORAGE_NAME, JSON.stringify(state)))
