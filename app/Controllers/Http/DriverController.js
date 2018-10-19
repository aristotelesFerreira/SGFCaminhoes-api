'use strict'

const Driver = use('App/Models/Driver')

class DriverController {

    async index ({ request }) {
        const data = request.all()

        const driver = Driver.query().where(data)
        
        return driver

    }
  
    async store ({ request }) {
      const data = request.only([
        'name', 'cpf_number', 'drivers_license', 'admission_date', 
        'resignation_date', 'driversLicense_validate', 'phone_1', 'phone_2' , 'status'
      ])

      const driver = await Driver.create(data)

      return driver

    }

    async show ({ params }) {
      const driver = await Driver.query().where('uuid', params.id)

      return driver

    }

    async update ({ params, request, response }) {
      const driver = await Driver.query().where('uuid', params.id).firstOrFail()
      
      const data = request.all()
    
      driver.merge(data)

      await driver.save()

      return driver
    }
}

module.exports = DriverController
