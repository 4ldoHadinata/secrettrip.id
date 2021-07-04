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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const View = use('View')

// ...equates to this:
// Route.get('users', 'UserController.index').as('users.index')
// Route.post('users', 'UserController.store').as('users.store')
// Route.get('users/create', 'UserController.create').as('users.create')
// Route.get('users/:id', 'UserController.show').as('users.show')
// Route.put('users/:id', 'UserController.update').as('users.update')
// Route.patch('users/:id', 'UserController.update')
// Route.get('users/:id/edit', 'UserController.edit').as('users.edit')
// Route.delete('users/:id', 'UserController.destroy').as('users.destroy')
View.global('ok', function() {
    return 'Dikky'
})

// View.global('name', 'UserController.name')

// Route.on('/').render('welcome')
Route.get('admin/login', 'UserController.loginPage').as('login')
Route.post('admin/login', 'UserController.login')
Route.group(() => {
    Route.get('/', 'Admin/PageController.dashboard').as('dashboard')
    Route.get('logout', 'UserController.logout').as('logout')
    Route.resource('users', 'UserController')
    Route.resource('packet', 'Admin/PacketController')

    Route.resource('booking', 'Admin/BookingController')
    Route.get('booking/accpet/:id', 'Admin/BookingController.accept').as('booking.accept')

    Route.resource('testimonial', 'Admin/TestimonialController')
}).prefix('admin').middleware('login')