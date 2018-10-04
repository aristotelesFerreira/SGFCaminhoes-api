'use strict'

const Model = use('Model')

class Travel extends Model {

    static boot () {
        super.boot()
        this.addHook('beforeCreate', 'CommonHook.getUuid')
    }

    driver() {
        return this.hasOne('App/Models/Driver')
    }

    vehicle() {
        return this.hasMany('App/Models/Vehicle')
    }

    carts() {
        return this.belongsToMany('App/Models/Cart')
    }

    itinerary() {
        return this.hasOne('App/Models/Itinerary')
    }

}



module.exports = Travel
