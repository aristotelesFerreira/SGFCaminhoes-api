'use strict'

const Cart = use ('App/Models/Cart')

class CartController {
 
  async index () {
    const carts = Cart.all()

    return carts
  }

  async store ({ request }) {
    const data = request.only([
      'brand', 'model', 'description', 'type', 'km_current', 'year', 'capacity', 'plate', 'chassis_number',
      'purchase_price', 'sale_value', 'purchase_date', 'observation', 'status'
    ])
    
    const cart = await Cart.create(data)

    return cart
  }

 
  async show ({ params }) {
    const cart = await Cart.findOrFail(params.id)

    return cart
  }

 
  async update ({ params, request, response }) {
  }


  async destroy ({ params, request, response }) {
  }
}

module.exports = CartController
