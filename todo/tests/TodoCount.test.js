import { TodoCount } from '../js/components/TodoCount.js';
import { tasks } from '../js/state.js';

QUnit.module('TodoCount', hooks => {

  let node;

  hooks.beforeEach(() => {
    node = document.createElement('span', { is : 'todo-count' });
    document.querySelector('#qunit-fixture').append(node);
  });

  QUnit.test('should be instance of TodoCount', assert => {
    assert.equal( node instanceof TodoCount, true);
  });

  QUnit.test('should update text content', assert => {
    tasks.splice(0, tasks.length);
    assert.equal( node.textContent, '0 items left');

    tasks.push({ title : 'test', completed : false});
    assert.equal( node.textContent, '1 item left');

    tasks.push({ title : 'test', completed : false});
    assert.equal( node.textContent, '2 items left');

    tasks[0].completed = true;
    assert.equal( node.textContent, '1 item left');

    tasks[1].completed = true;
    assert.equal( node.textContent, '0 items left');

    tasks.push({ title : 'test', completed : false});
    tasks.push({ title : 'test', completed : false});
    tasks.push({ title : 'test', completed : false});
    assert.equal( node.textContent, '3 items left');

    tasks.splice(0, tasks.length);
    assert.equal( node.textContent, '0 items left');
  });

  

});