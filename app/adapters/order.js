import RESTAdapter from '@ember-data/adapter/rest';

export default RESTAdapter.extend({
  host: "https://ember-store-api.herokuapp.com",
});