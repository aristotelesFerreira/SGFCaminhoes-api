'use strict'

const Cart = use ('App/Models/Cart')

class CartController {
 
  async index ({request}) {
    const data = request.all()

    const cart = Cart.query().where(data)
    //const cart = await Cart.query().where('status', true)

    return cart
  }

  async store ({ request }) {
    const data = request.only([
      'brand', 'model', 'description', 'type', 'km_current', 'year', 'capacity', 'plate', 'chassis_number',
      'purchase_price', 'sale_value', 'purchase_date', 'status'
    ])
    
    const cart = await Cart.create(data)

    return cart
  }

 
  async show ({ params }) {
    const cart = await Cart.query().where('uuid', params.id)//.where('status', true)

    return cart
    
  }

 
  async update ({ params, request, response }) {
    const cart = await Cart.query().where('uuid', params.id).firstOrFail()

    const data = request.all()

    await cart.merge(data)

    cart.save()

    return cart
  }

}

module.exports = CartController
