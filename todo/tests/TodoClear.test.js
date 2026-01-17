import { TodoClear } from '../js/components/TodoClear.js';
import { tasks } from '../js/state.js';

QUnit.module('TodoClear', hooks => {

  let node;

  hooks.beforeEach(() => {
    node = document.createElement('button', { is : 'todo-clear' });
    document.querySelector('#qunit-fixture').append(node);
  });  

  function shouldBeHidden() {
    return tasks.filter(task => task.completed).length === 0
  }

  QUnit.test('should be instance of TodoClear', assert => {
    assert.equal( node instanceof TodoClear, true);
  });

  QUnit.test('should be hidden if no task is completed', assert => {
    tasks.splice(0, tasks.length);
    assert.equal(node.hidden, true);

    tasks.push({ title : 'test', completed : false });
    assert.equal(node.hidden, true);
  });

  QUnit.test('should be visible if at least one task is completed', assert => {
    tasks.push({ title : 'test', completed : true });
    assert.equal(node.hidden, false);

    tasks.push({ title : 'test', completed : true });
    tasks.push({ title : 'test', completed : true });
    assert.equal(node.hidden, false);
  });

  QUnit.test('should remove tasks when clicked', assert => {

    tasks.push({ title : 'test', completed : true });
    node.click();

    assert.equal(tasks.filter(task => task.completed).length, 0);
  });

});