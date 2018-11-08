
'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.store')
Route.post('/auth', 'AuthenticationController.create')

Route.post('/recovery', 'AuthenticationController.sendEmail')

Route.put('users/:type/:id', 'UserController.update')

// Rotas com autenticação
 
//Reports Travels
Route.get('report/driver/:id', 'ReportController.driverReport').middleware('auth')
Route.get('report/vehicle/:id', 'ReportController.vehicleReport').middleware('auth')
Route.get('report/cart/:id', 'ReportController.cartReport').middleware('auth')
Route.get('report/travel/:id', 'ReportController.travelReport').middleware('auth')
Route.get('report/traveldate/:filter/:data/:data2/', 'ReportController.travelReportDate').middleware('auth')

//Reports Driver
Route.get('report/drivers', 'ReportController.driversByStatus').middleware('auth')

//Reports Vehicle
Route.get('report/vehicles', 'ReportController.vehiclesByFilters').middleware('auth')

//Reports Carts
Route.get('report/carts', 'ReportController.cartsByFilters').middleware('auth')

//Editar usuário
Route.put('users/:type/:id', 'UserController.update').middleware('auth')

//Rotas em geral
Route.resource('users', 'UserController')
  .apiOnly()
  .middleware('auth')

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