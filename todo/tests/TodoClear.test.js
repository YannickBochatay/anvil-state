import { TodoClear } from '../js/components/TodoClear.js';
import { tasks } from '../js/state.js';

QUnit.module('TodoClear', function(hooks) {

  let node;

  hooks.beforeEach(function () {
    node = document.createElement('button', { is : 'todo-clear' });
    let root = document.querySelector('#qunit-fixture');
    root.append(node);
  });  

  function shouldBeHidden() {
    return tasks.filter(task => task.completed).length === 0
  }

  QUnit.test('should be instance of TodoClear', function(assert) {
    assert.equal( node instanceof TodoClear, true);
  });

  QUnit.test('should be hidden if no task is completed', function(assert) {
    tasks.splice(0, tasks.length);
    assert.equal(node.hidden, true);

    tasks.push({ title : 'test', completed : false });
    assert.equal(node.hidden, true);
  });

  QUnit.test('should be visible if at least one task is completed', function(assert) {
    tasks.push({ title : 'test', completed : true });
    assert.equal(node.hidden, false);

    tasks.push({ title : 'test', completed : true });
    tasks.push({ title : 'test', completed : true });
    assert.equal(node.hidden, false);
  });

  QUnit.test('should remove tasks when clicked', function(assert) {

    tasks.push({ title : 'test', completed : true });
    node.click();

    assert.equal(tasks.filter(task => task.completed).length, 0);
  });

});