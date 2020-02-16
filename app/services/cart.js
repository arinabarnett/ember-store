import Service from '@ember/service'
import { storageFor } from 'ember-local-storage'
import { alias } from '@ember/object/computed'
import { set } from '@ember/object'

export default Service.extend({
    cart: storageFor('cart'),
    items: alias('cart.items'),
    count: alias('cart.count'),

    // Add a product to the cart

    add(item) {
        let new_product = {
            id: item.get('id'),
            name: item.get('name'),
            description: item.get('description'),
            image: item.get('img_src'),
            price: item.get('price'),
            available_quantity: item.get('available_quantity'),
            ordered_quantity: 1,
        }
        let itemsInStorage = this.get('items')
        let elementIndex = itemsInStorage.findIndex(obj => {
            return obj.id === item.id
        })

        if (elementIndex !== -1) {
            itemsInStorage[elementIndex].ordered_quantity =
                itemsInStorage[elementIndex].ordered_quantity + 1
            itemsInStorage[elementIndex].available_quantity =
                itemsInStorage[elementIndex].available_quantity - 1
        } else {
            itemsInStorage.push(new_product)
            new_product.available_quantity = new_product.available_quantity - 1
        }
        this.set('cart.items', itemsInStorage)
        this.set('cart.count', this.get('count') + 1)
    },

    // Add more of specific product to the cart
    add_more(item) {
        let new_arr = this.get('items')
        let elementIndex = new_arr.findIndex(obj => {
            return obj.id === item.id
        })

        if (
            elementIndex !== -1 &&
            new_arr[elementIndex].available_quantity !== 0
        ) {
            set(
                new_arr[elementIndex],
                'ordered_quantity',
                new_arr[elementIndex].ordered_quantity + 1
            )
            set(
                new_arr[elementIndex],
                'available_quantity',
                new_arr[elementIndex].available_quantity - 1
            )
            this.set('cart.count', this.get('count') + 1)
        }
        this.set('cart.items', new_arr)
    },

    // Reduce the 'ordered_quantity' value of an product by 1

    remove(item) {
        let new_arr = this.get('items')
        let elementIndex = new_arr.findIndex(obj => {
            return obj.id === item.id
        })

        if (
            elementIndex !== -1 &&
            new_arr[elementIndex].ordered_quantity !== 0
        ) {
            {
                set(
                    new_arr[elementIndex],
                    'ordered_quantity',
                    new_arr[elementIndex].ordered_quantity - 1
                )
                set(
                    new_arr[elementIndex],
                    'available_quantity',
                    new_arr[elementIndex].available_quantity + 1
                )
                this.set('cart.count', this.get('count') - 1)
            }
        }
        this.set('cart.items', new_arr)
    },

    // Delete a specific item from the cart

    delete(item) {
        let arr = this.get('items')
        let elementIndex = arr.findIndex(obj => {
            return obj.id === item.id
        })

        let quantity = arr[elementIndex].ordered_quantity
        if (elementIndex !== -1) {
            arr.removeAt(elementIndex)
        }
        this.set('cart.count', this.get('count') - quantity)
    },

    // Clear cart

    empty() {
        this.get('cart').reset()
    },
})
