import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerKeyEvent, fillIn} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEMS = [{city: 'San Francisco'}];

module('Integration | Component | list-filter', function(hooks) {
  setupRenderingTest(hooks);
  test('should update with matching listings', async function (assert) {
  this.set('filterByCity', (val) =>  {
    if (val === '') {
      return Promise.resolve({
        query: val,
        results: ITEMS });
    } else {
      return Promise.resolve({
        query: val,
        results: FILTERED_ITEMS });
    }
  });
test('should filter the list of rentals by city', async function(assert) {
  await visit('/');
  await fillIn('.list-filter input', 'seattle');
  await triggerKeyEvent('.list-filter input', 'keyup', 69);
  assert.equal(this.element.querySelectorAll('.results .listing').length, 1, 'should display 1 listing');
  assert.ok(this.element.querySelector('.listing .location').textContent.includes('Seattle'), 'should contain 1 listing with location Seattle');
});
  await render(hbs`
    <ListFilter @filter={{action filterByCity}} as |results|>
      <ul>
      {{#each results as |item|}}
        <li class="city">
          {{item.city}}
        </li>
      {{/each}}
      </ul>
    </ListFilter>
  `);

  // fill in the input field with 's'
  await fillIn(this.element.querySelector('.list-filter input'),'s');
  // keyup event to invoke an action that will cause the list to be filtered
  await triggerKeyEvent(this.element.querySelector('.list-filter input'), "keyup", 83);

  return settled().then(() => {
    assert.equal(this.element.querySelectorAll('.city').length, 1, 'One result returned');
    assert.equal(this.element.querySelector('.city').textContent.trim(), 'San Francisco');
  });
});
  test('should initially load all listings', async function (assert) {
    // we want our actions to return promises,
    //since they are potentially fetching data asynchronously
    this.set('filterByCity', () => Promise.resolve({ results: ITEMS }));

    // with an integration test,
    // you can set up and use your component in the same way your application
    // will use it.
    await render(hbs`
      <ListFilter @filter={{action filterByCity}} as |results|>
        <ul>
        {{#each results as |item|}}
          <li class="city">
            {{item.city}}
          </li>
        {{/each}}
        </ul>
      </ListFilter>
    `);

  });

});