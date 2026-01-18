import { state, onStateChange, offStateChange } from '../js/state.js'

QUnit.module('state', hooks => {

  const { tasks } = state;

  hooks.beforeEach(() => {
    tasks.splice(0, tasks.length);
  });

  QUnit.test('subscribe on tasks length changes', assert => {
    let changes = 0;

    function handleChanges(prop) {
      if (prop === 'length') changes++;
    }

    onStateChange(handleChanges);

    tasks.push({ title : 'test', completed : false });
    assert.equal(changes, 1);

    tasks.pop()
    assert.equal(changes, 2);

    state.filter = 'done';
    assert.equal(changes, 2);

    offStateChange(handleChanges);
  });

  QUnit.test('subscribe on filter changes', assert => {
    let changes = 0;

    function handleChanges(prop) {
      if (prop === 'filter') changes++
    }

    onStateChange(handleChanges);

    state.filter = 'done';
    assert.equal(changes, 1);

    state.filter = 'null';
    assert.equal(changes, 2);

    offStateChange(handleChanges);
  });

  QUnit.test('subscribe on specific task changes', assert => {
    let changes = 0;

    function handleChanges(prop) {
      if (prop === 'title' || prop === 'completed') changes++
    }

    onStateChange(handleChanges);

    tasks.push({ title : 'test', completed : false });

    tasks[0].title = 'another title';
    assert.equal(changes, 1);

    tasks[0].completed = true;
    assert.equal(changes, 2);

    offStateChange(handleChanges);
  });

});