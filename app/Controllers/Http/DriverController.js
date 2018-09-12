'use strict'

const Driver = use('App/Models/Driver')

class DriverController {

    async index () {
        const drivers = Driver.all()

        return drivers
    }
      
    async show ({ params }) {
      const driver = await Driver.findOrFail(params.id)

      return driver

    }
  
    async store ({ request }) {
      const data = request.only(['name', 'cpf_number', 'drivers_license', 'admission_date', 'resignation_date', 'salary', 'phone_1', 'phone_2'])

      const driver = await Driver.create(data)

      return driver

    }

  
    async update ({ params, request, response }) {
    }

    async destroy ({ params, request, response }) {
    }
}

module.exports = DriverController
