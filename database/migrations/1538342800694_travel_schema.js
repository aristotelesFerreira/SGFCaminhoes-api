'use strict'

const Schema = use('Schema')

class TravelSchema extends Schema {
  up () {
    this.create('travels', (table) => {
      table.increments()
      table.string('uuid').notNullable().unique()
      table.integer('driver_id').unsigned().references('id').inTable('drivers')
      table.integer('vehicle_id').unsigned().references('id').inTable('vehicles')
      table.integer('itinerary_id').unsigned().references('id').inTable('itineraries')
      table.date('departureDate').notNullable()
      table.date('arrivalDate')
      table.string('description')
      table.enum('status',['in_progress', 'finished', 'canceled']).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('travels')
  }
}

module.exports = TravelSchema