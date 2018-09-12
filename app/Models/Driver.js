'use strict'

const Model = use('Model')

class Driver extends Model {
    static boot () {
        super.boot()
        this.addHook('beforeCreate', 'CommonHook.getUuid')
    }
}

module.exports = Driver
