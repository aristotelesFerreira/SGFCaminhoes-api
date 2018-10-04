'use strict'

const Model = use('Model')

class Driver extends Model {
    static boot () {
        super.boot()
        this.addHook('beforeCreate', 'CommonHook.getUuid')
    }
    travel() {
        return this.belongsToMany('App/Models/Travel')
    }
}

module.exports = Driver
