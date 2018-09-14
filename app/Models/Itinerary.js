'use strict'

const Model = use('Model')

class Itinerary extends Model {
    static boot () {
        super.boot()
        this.addHook('beforeCreate', 'CommonHook.getUuid')
    }
}

module.exports = Itinerary
