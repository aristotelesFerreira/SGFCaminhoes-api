'use strict'

const Model = use('Model')

class Itinerary extends Model {
    static boot () {
        super.boot()
        this.addHook('beforeCreate', 'CommonHook.getUuid')
    }
    
    travel() {
        return this.belongsTo('App/Models/Travel')
    }
}

module.exports = Itinerary
