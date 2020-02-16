import Component from '@ember/component'
import { computed } from '@ember/object'

export default Component.extend({
    tagName: '',
    items: computed('order.products', function() {
        let products = this.get('order.products');
        let productNames = products.map((product) => {
        return product.name;
        });
        return productNames;
        })
});