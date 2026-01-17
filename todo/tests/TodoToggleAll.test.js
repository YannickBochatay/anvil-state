import { TodoToggleAll } from '../js/components/TodoToggleAll.js';
import { tasks } from '../js/state.js';

QUnit.module('TodoToggleAll', hooks => {

  let node;

  hooks.beforeEach(() => {
    node = new TodoToggleAll();
    document.querySelector('#qunit-fixture').append(node);
    tasks.splice(0, tasks.length);
  });

  QUnit.test('should be instance of TodoToggleAll', assert => {
    assert.equal(node instanceof TodoToggleAll, true);
  });

  QUnit.test('should be checked if all tasks are done', assert => {
    const input = node.querySelector('input');

    tasks.push({ title : 'test', completed : true });
    tasks.push({ title : 'test', completed : true });

    assert.equal(input.checked, true);

    tasks[0].completed = false;
    assert.equal(input.checked, false);
  });

  QUnit.test('should toggle all tasks when clicked', assert => {
    const input = node.querySelector('input');

    tasks.push({ title : 'test', completed : true });
    tasks.push({ title : 'test', completed : true });

    input.click();
    assert.equal(tasks.every(task => !task.completed), true);

    input.click();
    assert.equal(tasks.every(task => task.completed), true);

    tasks.push({ title : 'test', completed : false });
    input.click();
    assert.equal(tasks.every(task => task.completed), true);

  });

});