'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
// Rotas sem autenticação

Route.post('/users', 'UserController.store')
Route.post('/auth', 'AuthenticationController.create')

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