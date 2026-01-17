import { TodoDestroy } from '../js/components/TodoDestroy.js';
import { tasks } from '../js/state.js';

QUnit.module('TodoDestroy', hooks => {

  let node;

  hooks.beforeEach(() => {
    node = document.createElement('button', { is : 'todo-destroy' });
    document.querySelector('#qunit-fixture').append(node);
    tasks.splice(0, tasks.length);
  });

  QUnit.test('should be instance of TodoDestroy', assert => {
    assert.equal(node instanceof TodoDestroy, true);
  });

  QUnit.test('should update property when attribute change', assert => {
    node.setAttribute('index', '5')
    assert.equal(node.index, 5);
  });

  QUnit.test('should destroy task', assert => {
    tasks.push({ title : 'test', completed : false });
    node.setAttribute('index', '0');
    node.click();
    assert.equal(tasks.length, 0);
  })
});