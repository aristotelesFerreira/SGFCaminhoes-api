'use strict'

const Vehicle = use('App/Models/Vehicle')

class VehicleController {
  
  async index () {
    const vehicles = Vehicle.all()

    return vehicles
  }

  
  async store ({ request }) {
    const data = request.only([
      'brand', 'model', 'type', 'km_current', 'year', 'plate', 'chassis_number', 'purchase_price',
      'sale_value', 'purchase_date', 'status'
    ])
    const vehicle = await Vehicle.create(data)

    return vehicle
  }

 
  async show ({ params }) {
    const vehicle = await Vehicle.query().where('uuid', params.id)

    return vehicle
  }

  
  async update ({ params, request, response }) {
  }

  
  async destroy ({ params, request, response }) {
  }
}

module.exports = VehicleController
