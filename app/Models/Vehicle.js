'use strict'

const Model = use('Model')

class Vehicle extends Model {
    static boot () {
        super.boot()
        this.addHook('beforeCreate', 'CommonHook.getUuid')
    }
}

module.exports = Vehicle
