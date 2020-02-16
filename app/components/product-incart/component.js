import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  cart: service(),
  product: null,

  actions: {
    addMore(){
      this.get('cart').add_more(this.product);
    },
    removeItem(){
      this.get('cart').delete(this.product);
    },
    removeFromCart(){
      this.get('cart').remove(this.product);
    },
  },
});

