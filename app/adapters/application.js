import RESTAdapter from '@ember-data/adapter/rest';

export default RESTAdapter.extend({
  namespace: 'api',
  host: 'https://ember-store-api.herokuapp.com'
});