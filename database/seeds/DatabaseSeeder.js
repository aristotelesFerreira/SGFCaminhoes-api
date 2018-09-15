'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Factory = use('Factory')

class DatabaseSeeder {
  async run () {
    await Factory.model('App/Models/Driver').create()
    await Factory.model('App/Models/Vehicle').create()
    await Factory.model('App/Models/Cart').create()
    await Factory.model('App/Models/Itinerary').create()
  }
 
}

module.exports = DatabaseSeeder
