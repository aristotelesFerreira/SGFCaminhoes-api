//import { userInfo } from "os";

'use strict'

const Driver = use('App/Models/Driver')
const Vehicle = use('App/Models/Vehicle')
const Travel = use('App/Models/Travel')
const Cart = use('App/Models/Cart')


class TravelController {
 
  async index ({ request }) {
    const data = request.all()
    
    const travel = Travel.query()
      .where(data)
      .with('carts')
      .with('vehicle')
      .with('driver')
      .with('itinerary')
      .fetch()

    return travel
  }

  async store ({ request, response }) {

    const {carts_id, ...data }  = request.only([
      'driver_id','vehicle_id', 'itinerary_id', 'carts_id', 'departureDate', 'arrivalDate', 'description', 'status'
    ])
    const travel = await Travel.create(data)
    //const vehicle =  data.vehicle_id
    
    const itinerary = await travel.itinerary().firstOrFail()

      if(carts_id && carts_id.length > 0) {
        
        /*const cartsId = await Cart.query()
        .where('status', true)
        .pluck('id')
        */
        
        await Cart
        .query()
        .whereIn('id', carts_id)
        .increment('km_current', itinerary.distance)

        await travel.carts().attach(carts_id)
        //await travel.load('carts')
      }

      if(data.vehicle_id > 0 ) {
      
       /* const vehicleId = await Vehicle.query()
        .where('id', data.vehicle_id)
        .pluck('id')
        //return vehicleId
        */

        await Vehicle
        .query()
        .where('id', data.vehicle_id)
        .increment('km_current', itinerary.distance)

      }
     
      /*
     .with('carts', (builder) => {
      builder.where('status', true)
      })
      */

    return travel
  }

  async show ({ params }) {
    
    const travel = await Travel.query()
      .where('uuid', params.id)
      .with('carts')
      .with('vehicle')
      .with('driver')
      .with('itinerary')
      .fetch()
   
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
