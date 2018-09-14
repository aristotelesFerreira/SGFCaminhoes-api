'use strict'

const Schema = use('Schema')

class CartSchema extends Schema {
  up () {
    this.create('carts', (table) => {
      table.increments()
      table.string('uuid').notNullable().unique()
      table.string('brand').notNullable()
      table.string('model').notNullable()
      table.string('description').notNullable()
      table.string('type').notNullable()
      table.double('km_current')
      table.integer('year')
      table.double('capacity')
      table.string('plate').notNullable().unique()
      table.string('chassis_number').notNullable().unique()
      table.double('purchase_price')
      table.double('sale_value')
      table.date('purchase_date')
      table.string('observation')
      table.enum('status',['active', 'inactive']).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('carts')
  }
}

module.exports = CartSchema
