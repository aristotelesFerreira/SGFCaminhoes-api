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
      .fetch()

    return travel
  }

  async store ({ request, response }) {

    const {carts_id, ...data }  = request.only([
      'driver_id', 'vehicle_id', 'itinerary_id', 'carts_id'
    ])

    const travel = await Travel.create(data)

    if(carts_id && carts_id.length > 0) {
        const cartsId = await Cart.query()
        .where('status', true)
        .pluck('id')
        
        const itinerary = await travel.itinerary().firstOrFail()
        await Cart
        .query()
        .whereIn('id', cartsId)
        .increment('km_current', itinerary.distance)
        
      await travel.carts().attach(cartsId)
      await travel.load('carts')
     
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
