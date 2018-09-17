'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    await User.create({
      email: 'admin@admin.com',
      password: '123456',
      acess: 'admin',
      status: true
    })

  }
}

module.exports = UserSeeder
