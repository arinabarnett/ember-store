import Model, { attr } from "@ember-data/model";

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  img_src: attr('string'),
  available_quantity: attr('number'),
  price: attr('number'),
  ordered_quantity: attr('number'),
});
