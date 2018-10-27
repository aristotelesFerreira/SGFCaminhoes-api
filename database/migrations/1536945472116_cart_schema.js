'use strict'

const Schema = use('Schema')

class CartSchema extends Schema {
  up () {
    this.create('carts', (table) => {
      table.increments()
      table.string('uuid', 50).notNullable().unique()
      table.string('brand', 50).notNullable()
      table.string('model', 50).notNullable()
      table.string('description', 100)
      table.string('type', 20).notNullable()
      table.double('km_current')
      table.integer('year', 4)
      table.double('capacity')
      table.string('plate', 10).notNullable().unique()
      table.string('chassis_number', 17).notNullable().unique()
      table.double('purchase_price')
      table.double('sale_value')
      table.date('purchase_date')
      table.boolean('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('carts')
  }
}

module.exports = CartSchema
