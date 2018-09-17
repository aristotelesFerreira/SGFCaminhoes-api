'use strict'

const Schema = use('Schema')

class VehicleSchema extends Schema {
  up () {
    this.create('vehicles', (table) => {
      table.increments()
      table.string('uuid').notNullable().unique()
      table.string('brand').notNullable()
      table.string('model').notNullable()
      table.string('type').notNullable()
      table.double('km_current')
      table.integer('year')
      table.string('plate').notNullable().unique()
      table.string('chassis_number').notNullable().unique()
      table.double('purchase_price')
      table.double('sale_value')
      table.date('purchase_date')
      table.boolean('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vehicles')
  }
}

module.exports = VehicleSchema
