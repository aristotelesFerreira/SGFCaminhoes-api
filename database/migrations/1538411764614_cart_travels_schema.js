'use strict'

const Schema = use('Schema')

class CartTravelSchema extends Schema {
  up () {
    this.create('cart_travels', (table) => {
      table.increments()
      table.integer('travel_id').unsigned().references('travels.id').onDelete('cascade').index('travel_id')
      table.integer('cart_id').unsigned().references('carts.id').onDelete('cascade').index('cart_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('cart_travels')
  }
}

module.exports = CartTravelSchema
