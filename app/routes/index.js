import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.replaceWith('rentals');
  },

  model() {
    return this.store.findAll('rental');
  }
});
