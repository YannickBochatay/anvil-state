import { TodoItem } from '../js/components/TodoItem.js';
import { tasks } from '../js/state.js';

QUnit.module('TodoItem', hooks => {

  let node;

  hooks.beforeEach(() => {
    node = new TodoItem();
    document.querySelector('#qunit-fixture').append(node);
    tasks.splice(0, tasks.length);
    tasks.push({ title : 'test', completed : false });
    node.index = 0;
  });  

  QUnit.test('index should propagate to inner elements', assert => {
    const [...innerNodes] = node.querySelectorAll('[index]');
    assert.equal(innerNodes.every(node => node.getAttribute('index') === '0'), true);
  });

  QUnit.test('properties should update attributes', assert => {
    node.label = 'test';
    assert.equal(node.getAttribute('label'), 'test');

    node.index = 0;
    assert.equal(node.getAttribute('index'), '0');

    node.completed = true;
    assert.equal(node.hasAttribute('completed'), true);

    node.editing = true;
    assert.equal(node.hasAttribute('editing'), true);
  });

  QUnit.test('attributes should update properties', assert => {
    node.setAttribute('label', 'test');
    assert.equal(node.label, 'test');

    node.setAttribute('index', '0');
    assert.equal(node.index, 0);

    node.setAttribute('completed', '');
    assert.equal(node.completed, true);

    node.setAttribute('editing', '');
    assert.equal(node.editing, true);
  });

  QUnit.test('label property should change inner text', assert => {
    node.label = 'test';
    assert.equal(node.querySelector('label').textContent, 'test');
  });

  QUnit.test('editing property should activate edition', assert => {
    node.editing = true;
    assert.equal(node.classList.contains('editing'), true);
    assert.equal(node.querySelector('[is=todo-edit]').hidden, false);
  });

  QUnit.test('completed property should check input and add completed class', assert => {
    node.completed = true;
    assert.equal(node.classList.contains('completed'), true);
    assert.equal(node.querySelector('input.toggle').checked, true);

    node.completed = false;
    assert.equal(node.classList.contains('completed'), false);
    assert.equal(node.querySelector('input.toggle').checked, false);
  });

});