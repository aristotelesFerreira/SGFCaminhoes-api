//import { userInfo } from "os";

'use strict'

const Driver = use('App/Models/Driver')
const Vehicle = use('App/Models/Vehicle')
const Travel = use('App/Models/Travel')


class TravelController {
 
  async index () {
    const travel = Travel.all()

    return travel
  }

  async store ({ request, response }) {

    const {carts_id, ...data }  = request.only([
      'driver_id', 'vehicle_id', 'itinerary_id', 'carts_id'
    ])

    const travel = await Travel.create(data)

    if(carts_id && carts_id.length > 0) {
      await travel.carts().attach(carts_id)
      await travel.load('carts')
    }

    return travel
  }

  async show ({ params }) {
    
    const travel = await Travel.query().where('uuid', params.id)

    return travel
    //Buscar as viagens de um driver_id
    //const driver = await Driver.findOrFail(params.id)
   // const travel = await driver.travel().where('driver_id', params.id)//select*from drivers
    
   // return travel
  }


  async update ({ params, request, response }) {

  }

  
}

module.exports = TravelController
