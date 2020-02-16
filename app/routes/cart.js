import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
cart: service(),
    model(){    
        const items = this.get('cart.items');
        return items;
    },
});
