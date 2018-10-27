'use strict'

const Schema = use('Schema')

class ItinerariesSchema extends Schema {
  up () {
    this.create('itineraries', (table) => {
      table.increments()
      table.string('uuid', 50).notNullable().unique()
      table.string('route_name', 50).notNullable().unique()
      table.string('initial_point', 100).notNullable()
      table.double('lat_initial').notNullable()
      table.double('lng_initial').notNullable()
      table.string('end_point', 100).notNullable()
      table.double('lat_end').notNullable()
      table.double('lng_end').notNullable()
      table.double('distance').notNullable()
      table.string('observation', 50)
      table.boolean('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('itineraries')
  }
}

module.exports = ItinerariesSchema
