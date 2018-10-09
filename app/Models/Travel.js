'use strict'

const Model = use('Model')

class Travel extends Model {

    static boot () {
        super.boot()
        this.addHook('beforeCreate', 'CommonHook.getUuid')
    }

    driver() {
        return this.belongsTo('App/Models/Driver')
    }

    vehicle() {
        return this.belongsTo('App/Models/Vehicle')
    }

    carts() {
        return this
        .belongsToMany('App/Models/Cart')
        .pivotTable('cart_travels')
    }

    itinerary() {
        return this.belongsTo('App/Models/Itinerary', 'itinerary_id', 'id')
    }

    static get hidden () {
        return ['driver_id', 'vehicle_id', 'cart_id', 'itinerary_id']
      }

}



module.exports = Travel
