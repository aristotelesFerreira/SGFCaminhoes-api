'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')
const Hash = use('Hash')

//const User = use('App/Models/User')


  Factory.blueprint('App/Models/User', async (faker) => {
    return {
      email: 'teste@teste.com',
      password: '123456'
    }
    const user = await Factory
    .model('App/Models/User')
    .create()
  })


