'use strict'

const Schema = use('Schema')

class VehicleSchema extends Schema {
  up () {
    this.create('vehicles', (table) => {
      table.increments()
      table.string('uuid', 50).notNullable().unique()
      table.string('brand', 50).notNullable()
      table.string('model', 50).notNullable()
      table.string('type', 20).notNullable()
      table.double('km_current')
      table.integer('year', 4)
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
    this.drop('vehicles')
  }
}

module.exports = VehicleSchema
