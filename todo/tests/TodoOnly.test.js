import { TodoOnly } from '../js/components/TodoOnly.js';
import { tasks } from '../js/state.js';

QUnit.module('TodoOnly', hooks => {

  let node;

  hooks.beforeEach(() => {
    node = new TodoOnly();
    document.querySelector('#qunit-fixture').append(node);
  });

  QUnit.test('should be hidden if no task is defined', assert => {
    tasks.splice(0, tasks.length);
    assert.equal(node.hidden, true);
  });

  QUnit.test('should be visible if some task is defined', assert => {
    tasks.push({ title : 'test', completed : false });
    assert.equal(node.hidden, false);

    tasks.push({ title : 'test', completed : false });
    assert.equal(node.hidden, false);
  })
});