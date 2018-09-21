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


  /*Factory.blueprint('App/Models/User', async (faker) => {
    return {
      email: 'teste@teste.com',
      password: '123456'
    }
  })*/

  Factory.blueprint('App/Models/Driver', async (faker) => {
    return {
      name: 'Joao Batista Ferreira',
      cpf_number: '155.581.864-80',
      drivers_license: 'ABCDE',
      admission_date: '2018-08-15',
      //resignation_date: '',
      driversLicense_validate: '2018-09-20',
      phone_1: '62 981703778',
      phone_2: '(62) 9-84681533',
      status: true
    }
  })
  Factory.blueprint('App/Models/Vehicle', async (faker) => {
    return {
      brand: 'Volkswagem',
      model: '15-180',
      type: 'Cavalo Mecanico',
      km_current: '500',
      year: '2012',
      plate: 'KSP-2030',
      chassis_number:'ASD53168D86835D3518R',
      purchase_price: '100000.00',
      sale_value: '80000.00',
      purchase_date: '2018-02-15',
      status: true
    }
  })
  Factory.blueprint('App/Models/Cart', async (faker) => {
    return {
      brand: 'Randon',
      model: 'Graneleiro',
      description: '7.50m X 1.80M',
      type: 'Bitrem',
      km_current: '500',
      year: '2011',
      capacity: '32000.00',
      plate: 'KSP-2030',
      chassis_number:'ASD53168D86835D3518R',
      purchase_price: '100000.00',
      sale_value: '80000.00',
      purchase_date: '2018-02-15',
      status: true
    }
  })
  Factory.blueprint('App/Models/Itinerary', async (faker) => {
    return {
      route_name: 'Rota BR 070',
      initial_point: 'Jussara - GO',
      end_point: 'São Luis Montes Belos - GO',
      distance: '130',
      observation: 'Estrada perigosa',
      status: true
    }
  })

  



