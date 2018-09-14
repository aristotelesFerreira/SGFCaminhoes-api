'use strict'

const Model = use('Model')

class Cart extends Model {
    static boot () {
        super.boot()
        this.addHook('beforeCreate', 'CommonHook.getUuid')
    }
}

module.exports = Cart
