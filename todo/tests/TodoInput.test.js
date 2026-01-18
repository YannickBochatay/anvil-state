import { TodoInput } from '../js/components/TodoInput.js';
import { tasks } from '../js/state.js';

QUnit.module('TodoInput', hooks => {

  let node;

  hooks.beforeEach(() => {
    node = new TodoInput();
    document.querySelector('#qunit-fixture').append(node);
    tasks.splice(0, tasks.length);
  });

  QUnit.test('should add task on submit and clear value', assert => {
    const input = node.querySelector('input');

    function submit() {
      const event = new Event('submit');
      node.querySelector('form').dispatchEvent(event);
    }

    let title = 'new task';
    input.value = title;
    submit();

    assert.equal(tasks.length, 1);
    assert.equal(tasks[0].title, title);
    assert.equal(input.value, '');

    title = 'another new task';
    input.value = title;
    submit();

    assert.equal(tasks.length, 2);
    assert.equal(tasks[1].title, title);
    assert.equal(input.value, '');
  });

});