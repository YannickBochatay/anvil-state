import { state, onStateChange, offStateChange } from '../js/state.js'

QUnit.module('state', function() {

  QUnit.test('reset state', function(assert) {
    state.tasks = [];
    assert.equal(state.tasks.length, 0);
  });

  QUnit.test('subscribe on tasks length changes', function(assert) {
    let changes = 0;

    function handleChanges(prop) {
      if (prop === 'length') changes++
    }

    onStateChange(handleChanges);

    state.tasks.push({ title : 'test', completed : false });
    assert.equal(changes, 1);

    state.tasks.pop()
    assert.equal(changes, 2);

    state.filter = 'done';
    assert.equal(changes, 2);

    offStateChange(handleChanges);
  });

  QUnit.test('subscribe on filter changes', function(assert) {
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

  QUnit.test('subscribe on specific task changes', function(assert) {
    let changes = 0;

    function handleChanges(prop) {
      if (prop === 'title' || prop === 'completed') changes++
    }

    onStateChange(handleChanges);

    state.tasks.push({ title : 'test', completed : false });

    state.tasks[0].title = 'another title';
    assert.equal(changes, 1);

    state.tasks[0].completed = true;
    assert.equal(changes, 2);

    offStateChange(handleChanges);
  });

});