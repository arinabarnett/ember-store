import Model, { attr } from "@ember-data/model";

export default Model.extend({
    customer_name: attr('string'),
    customer_phone: attr('number'),
    products: attr(),
    products_count: attr('number'),
    date_time: attr(),
    total_price: attr('number'),
    address: attr('string'),
});
