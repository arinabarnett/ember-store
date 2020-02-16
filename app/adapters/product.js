import RESTAdapter from '@ember-data/adapter/rest';

export default RESTAdapter.extend({
  urlForFindAll() {
    return 'https://ember-store-api.herokuapp.com/products';
  },
});