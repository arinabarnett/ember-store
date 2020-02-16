import Controller from '@ember/controller'
import { inject as service } from '@ember/service'
import { computed } from '@ember/object'

export default Controller.extend({
    cart: service(),
    total: computed('cart.items.@each.{ordered_quantity}', function() {
        let items = this.get('cart.items')
        let sum = items.reduce(
            (sum, { price, ordered_quantity }) =>
                sum + price * ordered_quantity,
            0
        )
        return sum
    }),
    
    actions: {
        createOrder(event) {
            event.preventDefault()
            let order = this.store.createRecord('order', {
                customer_name: this.name,
                customer_phone: this.phonenumber,
                products: this.get('cart.items'),
                products_count: this.get('cart.count'),
                date_time: new Date(),
                total_price: this.total,
                address: this.address,
            })
            order.save().then(response => {
                console.error('response', response)
                this.get('cart').empty()
                this.transitionToRoute('index')
            })
        },
    },
})
