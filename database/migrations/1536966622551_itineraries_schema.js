'use strict'

const Schema = use('Schema')

class ItinerariesSchema extends Schema {
  up () {
    this.create('itineraries', (table) => {
      table.increments()
      table.string('uuid').notNullable().unique()
      table.string('route_name').notNullable()
      table.string('initial_point').notNullable()
      table.string('end_point').notNullable()
      table.double('distance').notNullable()
      table.string('observation')
      table.string('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('itineraries')
  }
}

module.exports = ItinerariesSchema
