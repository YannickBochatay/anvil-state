import { TodoToggle } from '../js/components/TodoToggle.js';
import { tasks } from '../js/state.js';

QUnit.module('TodoToggle', hooks => {

  let node;

  hooks.beforeEach(() => {
    node = document.createElement('input', { is : 'todo-toggle' });
    document.querySelector('#qunit-fixture').append(node);
    tasks.splice(0, tasks.length);
  });

  QUnit.test('should be instance of TodoToggle', assert => {
    assert.equal(node instanceof TodoToggle, true);
  });

  QUnit.test('should update property when attribute change', assert => {
    node.setAttribute('index', '5');
    assert.equal(node.index, 5);
  });

  QUnit.test('should toggle task', assert => {
    tasks.push({ title : 'test', completed : false });
    node.setAttribute('index', '0');

    node.click();
    assert.equal(tasks[0].completed, true);

    node.click();
    assert.equal(tasks[0].completed, false);
  })
});