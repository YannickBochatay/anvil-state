import { TodoFilters } from '../js/components/TodoFilters.js';
import { state } from '../js/state.js';

QUnit.module('TodoFilters', hooks => {

  let node;

  hooks.beforeEach(() => {
    node = new TodoFilters();
    document.querySelector('#qunit-fixture').append(node);
    location.hash = '';
  });

  QUnit.test('hash change should change filter', assert => {
    const done = assert.async();

    location.hash = '#/active';

    // reaction on hash change is async, so we have to wait a bit
    setTimeout(() => {
      assert.equal(state.filter, 'active');
      done();
    }, 10);
  });

  QUnit.test('hash change should change filter', assert => {
    const done = assert.async();

    location.hash = '#/completed';
    setTimeout(() => {
      assert.equal(state.filter, 'completed');
      done();
    }, 10);
  });

  QUnit.test('selected menu item should have selected class', assert => {
    const done = assert.async();

    location.hash = '#/completed';

    setTimeout(() => {
      let item = node.querySelector('a[href="#/completed"]');
      assert.equal(item.classList.contains('selected'), true);

      item = node.querySelector('a[href="#/active"]');
      assert.equal(item.classList.contains('selected'), false);

      done();
    }, 10);
  });

  QUnit.test('selected menu item should have selected class', assert => {
    const done = assert.async();

    location.hash = '#/active';

    setTimeout(() => {
      let item = node.querySelector('a[href="#/completed"]');
      assert.equal(item.classList.contains('selected'), false);

      item = node.querySelector('a[href="#/active"]');
      assert.equal(item.classList.contains('selected'), true);

      done();
    }, 10);
  });

  hooks.after(() => location.hash = '');

});