import { TodoEdit } from '../js/components/TodoEdit.js';
import { state, tasks } from '../js/state.js';

QUnit.module('TodoEdit', hooks => {

  let node;

  hooks.beforeEach(() => {
    node = document.createElement('input', { is : 'todo-edit' });
    node.hidden = true;
    node.setAttribute('index', '0');
    document.querySelector('#qunit-fixture').append(node);
    tasks.splice(0, tasks.length);
    tasks.push({ title : 'test', completed : false });
  });

  QUnit.test('should be instance of TodoEdit', assert => {
    assert.equal(node instanceof TodoEdit, true);
  });

  QUnit.test('should start editing when visible', assert => {
    node.hidden = false;
    assert.equal(node.value, 'test');
  });

  QUnit.test('should validate value with Enter key', assert => {
    const newValue = 'another value';
    node.hidden = false;
    node.value = newValue;

    const event = new KeyboardEvent('keyup', { key : 'Enter' });
    dispatchEvent(event);

    assert.equal(tasks[0].title, newValue);
  });

  QUnit.test('should validate value on blur event', assert => {
    const newValue = 'another value';
    node.hidden = false;
    node.value = newValue;

    const event = new Event('blur');
    node.dispatchEvent(event);
    
    assert.equal(tasks[0].title, newValue);
  });

  QUnit.test('should cancel value with Escape key', assert => {
    node.hidden = false;
    node.value = 'another value';

    const event = new KeyboardEvent('keyup', { key : 'Escape' });
    dispatchEvent(event);

    assert.equal(tasks[0].title, 'test');
  });

  QUnit.test('should delete task if value is empty', assert => {
    node.hidden = false;
    node.value = '';

    const event = new KeyboardEvent('keyup', { key : 'Enter' });
    dispatchEvent(event);

    assert.equal(tasks.length, 0);
  });

});