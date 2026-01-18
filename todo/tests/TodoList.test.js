import { TodoList } from '../js/components/TodoList.js';
import { state } from '../js/state.js';

QUnit.module('TodoList', hooks => {

  let node;
  const { tasks } = state;

  hooks.beforeEach(() => {
    node = document.createElement('ul', { is : 'todo-list'});
    document.querySelector('#qunit-fixture').append(node);
    tasks.splice(0, tasks.length);
  });  

  QUnit.test('should be instance of TodoList', assert => {
    assert.equal( node instanceof TodoList, true);
  });

  QUnit.test('should render nodes when task is added', assert => {
    assert.equal(node.children.length, 0);
    
    tasks.push({ title : 'test', completed : false });
    assert.equal(node.children.length, 1);

    tasks.push({ title : 'test', completed : false });
    assert.equal(node.children.length, 2);
  });

  QUnit.test('should update nodes properties when tasks are modified', assert => {  
    tasks.push({ title : 'test', completed : false });
    assert.equal(node.children[0].completed, false);

    tasks[0].completed = true;
    assert.equal(node.children[0].completed, true);

    tasks[0].title = 'another title';
    assert.equal(node.children[0].label, 'another title');
  });

  QUnit.test('should hide some nodes when filter is active', assert => {  
    tasks.push({ title : 'test', completed : false });
    tasks.push({ title : 'test', completed : true });
    tasks.push({ title : 'test', completed : true });

    state.filter = 'active';
    let hiddenCount = [...node.children].filter(node => node.hidden).length;
    assert.equal(hiddenCount, 2);

    state.filter = 'completed';
    hiddenCount = [...node.children].filter(node => node.hidden).length;
    assert.equal(hiddenCount, 1);

    state.filter = null;
    hiddenCount = [...node.children].filter(node => node.hidden).length;
    assert.equal(hiddenCount, 0);
  });

});