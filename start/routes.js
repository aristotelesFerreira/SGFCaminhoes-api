
'use strict'
var path = require('path')
var wkhtmltopdf = require('wkhtmltopdf')

const Route = use('Route')
// Rotas sem autenticação

Route.post('/users', 'UserController.store')
Route.post('/auth', 'AuthenticationController.create')



Route.get('/pdf', function(req, res) {

  return 'ok'
})



// Rotas com autenticação
 

Route.get('users', 'UserController.index').middleware('auth')
Route.get('users/:id', 'UserController.show').middleware('auth')

Route.resource('drivers', 'DriverController')
  .apiOnly()
  .middleware('auth')

Route.resource('carts', 'CartController')
  .apiOnly()
  .middleware('auth')

Route.resource('vehicles', 'VehicleController')
  .apiOnly()
  .middleware('auth')

Route.resource('itineraries', 'ItineraryController')
  .apiOnly()
  .middleware('auth')

Route.resource('travels', 'TravelController')
  .apiOnly()
  .middleware('auth')