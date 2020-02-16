import Component from '@ember/component'
import { inject as service } from '@ember/service'
import { computed } from '@ember/object'

export default Component.extend({
    cart: service(),
    product: null,

    isAddDisabled: computed('product.available_quantity', function() {
        return this.get('product.available_quantity') === 0
    }),

    actions: {
        addToCart() {
            if (this.get('isAddDisabled')) {
                return false
            }
            this.get('cart').add(this.product)
        },
    },
})
